from embedd import embedd
from elasticsearch import Elasticsearch
from config import config
import time

import logging

logger = logging.getLogger('es')
logger.setLevel(logging.INFO)  # 로그 레벨 설정

# 콘솔 핸들러 추가 (로그를 터미널에 출력)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)  # 핸들러 레벨 설정

# 로그 포맷 설정
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# 핸들러를 로거에 추가
logger.addHandler(console_handler)

es = Elasticsearch(f"http://{config['es']['host']}:{config['es']['port']}")

if es.ping():
    logger.info("Connected to Elasticsearch")
else:
    logger.exception("Could not connect to Elasticsearch")

def save_article_into_es(article_id, press_name, title, source_created_at):
    start = time.time()
    doc = {
        "id": article_id,
        "type": 'article',
        "title": title,
        "vector": embedd(title).tolist(),
        "viewCount": 0,
        "pressName": press_name,
        "sourceCreatedAt": source_created_at
    }
    
    try:
        es.index(index=config['es']['index'], document=doc)
        logger.info(f"save article(id={article_id}, title={title})")
        logger.info(f"실행시간: {time.time() - start}")
    except Exception as e:
        logger.exception(f"fail to save article(id={article_id}, title={title})")
        logger.exception(f"Detailed: {e}")