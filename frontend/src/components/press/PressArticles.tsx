import { useState } from 'react';
import styled from 'styled-components';
import SubTitle from '../mypage/SubTitle';
import ArticleListCardGroup from '../common/ArticleListCardGroup';
import data from 'db/data.json';

function PressArticles() {
  return (
    <Wrapper>
      <SubTitle title="업로드한 영상" />
      <ArticleListCardGroup articleList={data.articles} />
    </Wrapper>
  );
}

export default PressArticles;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 16px;
`;
