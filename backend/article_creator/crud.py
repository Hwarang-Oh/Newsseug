from sqlalchemy.orm import Session
from models.article import Article, ConversionStatus

def insert_article(session: Session, article: Article) -> Article:
    session.add(article)
    
    session.commit()
    
    return article

def update_article(session: Session, article: Article, content_url, thumbnail_url, video_url, conversion_status: ConversionStatus):
    
    # 속성 값 업데이트
    article.content_url = content_url
    article.thumbnail_url = thumbnail_url
    article.video_url = video_url
    article.conversion_status = conversion_status
        
    # 세션 커밋 (데이터베이스에 반영)
    session.commit()