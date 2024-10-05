from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base # Base 생성
from config import config


SQLALCHEMY_DATABASE_URL = f"mariadb+pymysql://{config['datasource']['user']}:{config['datasource']['password']}@{config['datasource']['host']}:{config['datasource']['port']}/{config['datasource']['database']}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base = declarative_base()