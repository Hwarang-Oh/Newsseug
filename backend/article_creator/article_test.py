import unittest
from typing import Optional
from article import summarize_article_content

class ArticleTestCase(unittest.TestCase):
    
    def test_summarize_article(self):
        # Given
        article: str = """
            시민단체 '전국비상시국회의'는 오늘 오전 서울 중구 프란치스코 회관에서 기자회견을 열고 종교계와 학계, 언론계 등 1천5백여 명이 참여한 시국선언문을 발표했습니다.

이들은 "윤석열 정권 2년 반 만에 나라가 밑뿌리부터 흔들리고 있다"며 "나라를 걱정하는 국민들을 '반국가세력'으로 규정한 현집권세력이야말로 친일·매국·반국가세력"이라고 비판했습니다.

그러면서 의료대란, 김건희 여사 명품백 수수 문제, 정부의 언론 탄압 등을 지적했습니다.
이번 시국선언에는 유홍준 전 문화재청장, 황석영 소설가, 강우일 전 천주교 제주교구장 등이 제안자로 참여했습니다.
        """
        
        # When
        result: Optional[str] = summarize_article_content(article)
        
        # Then
        self.assertIsNotNone(result)
        
if __name__=="__main__":
    unittest.main()