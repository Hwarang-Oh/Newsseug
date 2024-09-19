import styled from 'styled-components';

function ArticleInfo() {
  return (
    <Container>
      <ArticleCommonInfo>
        <ArticleDate>2024.04.23</ArticleDate>
        <ArticleTitle>부천 호텔 화재 당시 CCTV 공개</ArticleTitle>
        <ArticleUrl>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M14 8.49998L2.66667 15.1666L2.66667 1.83331L14 8.49998Z"
              fill="white"
            />
          </svg>
          원본 기사로 이동
        </ArticleUrl>
      </ArticleCommonInfo>
      <PressContainer>
        <PressInfo>
          <PressIcon />
          <PressName>YTN</PressName>
        </PressInfo>
        <PressSubscribe>구독</PressSubscribe>
      </PressContainer>
    </Container>
  );
}

export default ArticleInfo;

const Container = styled.div`
  display: flex;
  padding: 24px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const ArticleCommonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const ArticleTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  color: #fff;
`;

const ArticleDate = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;
  color: #fff;
`;

const ArticleUrl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;
  text-decoration: none;
  color: #fff;
`;

const PressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const PressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PressIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: #797979;
  border-radius: 100%;
`;

const PressName = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  color: #fff;
`;

const PressSubscribe = styled.button`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: #58d7a2;
  color: #fff;
  border: none;
  outline: none;
`;
