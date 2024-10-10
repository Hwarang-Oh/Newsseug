import { getCookie } from 'utils/stateUtils';
import { subscribePress, unsubscribePress } from 'apis/subscribe';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArticleDetailInfoProp } from 'types/props/articleVideo';

function ArticleDetailInfo({
  articleInfo,
  handleButtonClickWithoutLogin,
}: Readonly<ArticleDetailInfoProp>) {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(
    articleInfo.press.isSubscribed,
  );
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = getCookie('AccessToken');
    return !!token; // 토큰이 있으면 true, 없으면 false
  };
  const handleClick = async () => {
    if (!isAuthenticated()) {
      handleButtonClickWithoutLogin();
      return;
    }
    if (isSubscribed) {
      unsubscribePress(articleInfo.press.id);
    } else {
      subscribePress(articleInfo.press.id);
    }
    setIsSubscribed((prev) => !prev);
  };

  const handlePressClick = () => {
    navigate(`/press/${articleInfo.press.id}`);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '')
      .trim()
      .replace(/(\d{4})\s(\d{2})\s(\d{2})/, '$1. $2. $3');
  };

  return (
    <Container>
      <ArticleCommonInfo>
        <ArticleDate>{formatDate(articleInfo.article.createdAt)}</ArticleDate>
        <ArticleTitle>{articleInfo.article.title}</ArticleTitle>
        <ArticleUrl href={articleInfo.article.sourceUrl}>
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
        <PressInfo onClick={handlePressClick}>
          <PressIcon src={articleInfo.press.imageUrl} />
          <PressName>{articleInfo.press.name}</PressName>
        </PressInfo>
        <PressSubscribe $isSubscribed={isSubscribed} onClick={handleClick}>
          {isSubscribed ? (
            <svg
              width="10"
              height="10"
              viewBox="0 0 9 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M7.36612 0.96967C7.65901 0.676777 8.13388 0.676777 8.42678 0.96967C8.71608 1.25897 8.71963 1.72582 8.43742 2.01947L4.44522 7.00973C4.43946 7.01693 4.4333 7.02381 4.42678 7.03033C4.13388 7.32322 3.65901 7.32322 3.36612 7.03033L0.71967 4.38388C0.426777 4.09099 0.426777 3.61612 0.71967 3.32322C1.01256 3.03033 1.48744 3.03033 1.78033 3.32322L3.87385 5.41674L7.34622 0.992105C7.3524 0.984235 7.35904 0.976743 7.36612 0.96967Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="10"
              height="10"
              viewBox="0 0 9 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 0C4.77614 0 5 0.223858 5 0.5V3.5H8C8.27614 3.5 8.5 3.72386 8.5 4C8.5 4.27614 8.27614 4.5 8 4.5H5V7.5C5 7.77614 4.77614 8 4.5 8C4.22386 8 4 7.77614 4 7.5V4.5H1C0.723858 4.5 0.5 4.27614 0.5 4C0.5 3.72386 0.723858 3.5 1 3.5H4V0.5C4 0.223858 4.22386 0 4.5 0Z"
                fill="white"
              />
            </svg>
          )}
          {isSubscribed ? ' 구독중' : ' 구독'}
        </PressSubscribe>
      </PressContainer>
    </Container>
  );
}

export default ArticleDetailInfo;

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

const ArticleUrl = styled.a`
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
  cursor: pointer;
`;

const PressIcon = styled.img`
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

const PressSubscribe = styled.button<{ $isSubscribed: boolean }>`
  background-color: ${({ $isSubscribed, theme }) =>
    $isSubscribed ? theme.relaxColor.main : theme.mainColor};
  border: none;
  color: #fff;

  font-size: 14px;
  line-height: 14px;
  border-radius: 999px;
  transition: 0.2s;
  padding: 6px 12px;
  cursor: pointer;
`;
