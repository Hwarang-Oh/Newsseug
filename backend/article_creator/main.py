from typing import Optional

import boto3.session
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from contextlib import asynccontextmanager
from starlette.responses import Response

import aiomysql

from config import config
from article import create_article
from enum import Enum
import boto3
from io import BytesIO

class Category(Enum):
    POLITICS = 'politics'
    ECONOMY = 'economy'
    WORLD = 'word'
    INCIDENTS = 'incidents'
    SCIENCE = 'science'
    SOCIETY = 'society'
    SPORTS = 'sports'
    
class ConversionStatus(Enum):
    SUCCESS = 'success'
    RUNING = 'running'
    FILTERED = 'filtered'
    EXCEED_TOKEN = 'exceed_token'
    UNKNOWN_FAIL = 'unknown_fail'

class ContentType(Enum):
    PNG = "image/png"
    TEXT = "text/plain"
    MP4 = "video/mp4"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 애플리케이션 시작 시 풀 생성
    print("Starting up... Creating connection pool")
    
    # MariaDB Connection Pool 생성
    pool = await aiomysql.create_pool(
        
        host = config['datasource']['host'],
        port = config['datasource']['port'],
        user = config['datasource']['user'],
        password = config['datasource']['password'],
        db = config['datasource']['database'],
        minsize = config['datasource']['min_pool_size'],
        maxsize=config['datasource']['max_pool_size'],
        charset=config['datasource']['charset']
        
    )
    
    app.state.pool = pool  # 애플리케이션의 state에 저장
    
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
    print("Shutting down... Closing connection pool")
    pool.close()
    await pool.wait_closed()

app = FastAPI(lifespan=lifespan)

class CreateArticleRequestDto(BaseModel):
    title: str
    source_url: str
    content: str
    category: Category
    source_created_at: Optional[datetime] = None

@app.post("/api/v1/articles")
async def create_and_register_article(article_request_dto: CreateArticleRequestDto):
    
    id = insert_article_to_mariadb(article_request_dto.title, article_request_dto.source_url, article_request_dto.category, article_request_dto.time)
    
    upload_to_s3(id, article_request_dto.content, ContentType.TEXT)
    
    # video_clip, thumbnail, finish_reason = create_article(article_request_dto.content)
    
    
    
    # match finish_reason:
    #     case 'stop':
    #         conversion_status = ConversionStatus.SUCCESS
    #         upload_to_s3(id, video_clip, ContentType.MP4)
    #         upload_to_s3(id, thumbnail, ContentType.PNG)
    #     case 'content_filter':
    #         conversion_status = ConversionStatus.FILTERED
    #     case 'length':
    #         conversion_status = ConversionStatus.EXCEED_TOKEN
    #     case _:
    #         conversion_status = ConversionStatus.UNKNOWN_FAIL

    # update_article(id, conversion_status)

    return Response(status_code=200)

async def insert_article_to_mariadb(title:str, source_url: str, category: Category, source_created_at: datetime) -> int:
    pool = app.state.pool
    async with pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
                INSERT INTO articles (title, source_url, category, conversion_status, source_created_at)
                VALUE (%s, %s, %s, %s, %s)
            """

            await cursor.execute(insert_query, (title, source_url, category, ConversionStatus.RUNING, source_created_at))

            await conn.commit()
            
            inserted_id = cursor.lastrowid
            
    return inserted_id

async def update_article(id: int, conversion_status: ConversionStatus):
    pool = app.state.pool
    async with pool.acquire() as conn:
        async with conn.cursor() as cursor:
            update_query = """
                UPDATE articles SET content_url=%s, thumbnail_url=%s, video_url=%s, conversion_status=%s WHERE article_id=%s
            """
            
            url_template = "https://newsseug-bucket.s3.{region}.amazonaws.com/{id}/{name}"
            
            await cursor.execute(update_query, (
                    url_template.format(
                        region=config['s3']['region_name'], 
                        id=id,
                        name='content.txt'
                    ),
                    url_template.format(
                        region=config['s3']['region_name'], 
                        id=id,
                        name='thumbnail.png'
                    ),
                    url_template.format(
                        region=config['s3']['region_name'], 
                        id=id,
                        name='video.mp4'
                    ),
                    conversion_status,
                    id
                )
            )
            
            await conn.commit()

def upload_to_s3(id: int, data, content_type: ContentType):
    buffer = BytesIO()
    
    if content_type == ContentType.TEXT:
        file_path = f"{id}/{id}-content.txt"
        buffer.write(data.encode('utf-8'))
        
    elif content_type == ContentType.PNG:
        file_path = f"{id}/{id}-thumbnail.png"
        data.save(buffer, format=content_type.name)
        
    else:
        file_path = f"{id}/{id}-video.mp4"
        data.write_videofile(buffer, codec="libx264")
    
    buffer.seek(0)
    
    s3_client = app.state.s3_client
    
    s3_client.upload_fileobj(
        Fileobj=buffer,
        Bucket=config['s3']['bucket_name'],
        Key=file_path,
        ExtraArgs={'ContentType': content_type.value}
    )