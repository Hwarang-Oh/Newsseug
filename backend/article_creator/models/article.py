from db.session import Base
from sqlalchemy import Column, String, BigInteger, ForeignKey, TIMESTAMP, Enum, Sequence, func, CheckConstraint, Index
from sqlalchemy.orm import relationship
import enum

articles_seq = Sequence('articles_seq')

class Category(enum.Enum):
    ACCIDENT = 'accident'
    ECONOMY = 'economy'
    POLITICS = 'politics'
    SCIENCE = 'science'
    SOCIETY = 'society'
    SPORTS = 'sports'
    WORLD = 'world'
    
class ConversionStatus(enum.Enum):
    SUCCESS = 'success'
    RUNNING = 'running'
    FILTERED = 'filtered'
    EXCEED_TOKEN = 'exceed_token'
    UNKNOWN_FAIL = 'unknown_fail'
    
class ActivationStatus(enum.Enum):
    ACTIVE = 'active'
    INACTIVE = 'inactive'

class Press(Base):
    __tablename__ = 'press'

    # press_id is a primary key with autoincrement behavior
    press_id = Column(BigInteger, primary_key=True, autoincrement=True)

    # Other columns
    subscribe_count = Column(BigInteger, default=0, nullable=True)
    description = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    name = Column(String(255), nullable=True)

    # Enum for activation_status with a default value
    activation_status = Column(Enum(ActivationStatus), nullable=False, default=ActivationStatus.ACTIVE)

    # Timestamps with default value and on update functionality
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.current_timestamp(), onupdate=func.current_timestamp())

    articles = relationship("Article", back_populates="press")
    
class Article(Base):
    __tablename__ = 'articles'

    article_id = Column(BigInteger, primary_key=True, server_default=articles_seq.next_value())
    press_id = Column(BigInteger, ForeignKey('press.press_id', ondelete='CASCADE'), nullable=False)
    hate_count = Column(BigInteger, nullable=False, server_default=0)
    like_count = Column(BigInteger, nullable=False, server_default=0)
    source_created_at = Column(TIMESTAMP, nullable=True)
    view_count = Column(BigInteger, nullable=False, server_default=0)
    content_url = Column(String(255), nullable=True)
    source_url = Column(String(255), nullable=False)
    thumbnail_url = Column(String(255), nullable=True)
    title = Column(String(255), nullable=False)
    video_url = Column(String(255), nullable=True)

    # Enum for category
    category = Column(Enum(Category), nullable=False)

    # Enum for conversion_status
    conversion_status = Column(Enum(ConversionStatus), nullable=False)

    # Enum for activation_status with default value
    activation_status = Column(Enum(ActivationStatus), nullable=False, server_default=ActivationStatus.ACTIVE)

    # Timestamps with default value
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.current_timestamp(), onupdate=func.current_timestamp())

    press = relationship("Press", back_populates="articles")
    
    # Check constraint for created_at
    __table_args__ = (
        CheckConstraint('created_at = DEFAULT', name='CHK_CreatedAtNotUpdatable'),
        Index('idx_articles_press_id', 'press_id'),
        Index('idx_articles_title', 'title')
    )
    