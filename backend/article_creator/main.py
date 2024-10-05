import boto3.session
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from datetime import datetime
from contextlib import asynccontextmanager
from starlette.responses import Response

from config import config
from article import create_article
import boto3
from io import BytesIO

import enum

from db.connection import get_session
from models.article import Article, ConversionStatus, Category
from crud import insert_article, update_article

import logging

logger = logging.getLogger('main-logger')
logger.setLevel(logging.INFO)  # 로그 레벨 설정

# 콘솔 핸들러 추가 (로그를 터미널에 출력)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)  # 핸들러 레벨 설정

# 로그 포맷 설정
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# 핸들러를 로거에 추가
logger.addHandler(console_handler)

class ContentType(enum.Enum):
    PNG = "image/png"
    TEXT = "text/plain"
    MP4 = "video/mp4"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 애플리케이션 시작 시 풀 생성
    logger.info("Starting up... Creating connection pool")
    
    # S3 클라이언트 생성
    s3_client = boto3.client(
        's3',
        aws_access_key_id=config['s3']['aws_access_key'],
        aws_secret_access_key=config['s3']['aws_secret_key'],
        region_name=config['s3']['region_name']
    )
    
    app.state.s3_client = s3_client

    yield  # 애플리케이션이 실행되는 동안

    # 애플리케이션 종료 시 풀 닫기
    logger.info("Shutting down... Closing connection pool")

app = FastAPI(lifespan=lifespan)

class CreateArticleRequestDto(BaseModel):
    title: str
    source_url: str
    content: str
    category: Category
    source_created_at: datetime
    press_id: int
    
@app.post("/api/v1/articles")
async def create_and_register_article(article_request_dto: CreateArticleRequestDto, session = Depends(get_session)):

    # 새로운 기사 객체 생성
    new_article = Article(title=article_request_dto.title, source_url=article_request_dto.source_url, category=article_request_dto.category, source_created_at=article_request_dto.source_created_at, press_id=article_request_dto.press_id, conversion_status = ConversionStatus.RUNNING)
    
    # DB에 저장
    session.add(new_article)
    session.commit()

    upload_to_s3(new_article.article_id, article_request_dto.content, ContentType.TEXT)
    
    video_clip, thumbnail, finish_reason = create_article(article_request_dto.content)
    
    match finish_reason:
        case 'stop':
            conversion_status = ConversionStatus.SUCCESS
            upload_video_to_s3(new_article.article_id, video_clip)
            upload_to_s3(new_article.article_id, thumbnail, ContentType.PNG)
        case 'content_filter':
            conversion_status = ConversionStatus.FILTERED
        case 'length':
            conversion_status = ConversionStatus.EXCEED_TOKEN
        case _:
            conversion_status = ConversionStatus.UNKNOWN_FAIL

    update_article_s3_url_and_conversion_status(new_article, conversion_status, session = session)

    return Response(status_code=200)

def update_article_s3_url_and_conversion_status(article: Article, conversion_status: ConversionStatus, session):
    # URL 템플릿 생성
    url_template = "https://newsseug-bucket.s3.{region}.amazonaws.com/article/{article_id}/{name}"
    
    # 속성 값 업데이트
    content_url = url_template.format(
        region=config['s3']['region_name'],
        article_id=article.article_id,
        name='content.txt'
    )
    thumbnail_url = url_template.format(
        region=config['s3']['region_name'],
        article_id=article.article_id,
        name='thumbnail.png'
    )
    video_url = url_template.format(
        region=config['s3']['region_name'],
        article_id=article.article_id,
        name='video.mp4'
    )
    
    update_article(session, article, content_url, thumbnail_url, video_url, conversion_status)

def upload_to_s3(id: int, data, content_type: ContentType):
    buffer = BytesIO()
    
    if content_type == ContentType.TEXT:
        file_path = f"article/{id}/content.txt"
        buffer.write(data.encode('utf-8'))
        
    elif content_type == ContentType.PNG:
        file_path = f"article/{id}/thumbnail.png"
        data.save(buffer, format=content_type.name)
        
    else:
        file_path = f"article/{id}/video.mp4"
        data.write_videofile(buffer, codec="libx264")
    
    buffer.seek(0)
    
    s3_client = app.state.s3_client
    
    s3_client.upload_fileobj(
        Fileobj=buffer,
        Bucket=config['s3']['bucket_name'],
        Key=file_path,
        ExtraArgs={'ContentType': content_type.value}
    )

def upload_video_to_s3(id: int, video):
    file_path = "output.mp4"
    
    video.write_videofile(file_path, codec="libx264")
    
    s3_key = f"article/{id}/video.mp4"

    s3_client = app.state.s3_client
    
    s3_client.upload_file(
        file_path,
        config['s3']['bucket_name'],
        s3_key,
        {'ContentType': ContentType.MP4.value}
    )