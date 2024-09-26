import ArrowIcon from 'assets/arrowIconWhite.svg';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ArticleHeader() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Wrapper>
      <Helmet>
        <meta name="theme-color" content="#000" />
      </Helmet>
      <BackBtn onClick={handleGoBack}>
        <img src={ArrowIcon} alt="back arrow icon" />
      </BackBtn>
    </Wrapper>
  );
}

export default ArticleHeader;

const Wrapper = styled.div`
  padding: 12px;
  z-index: 3;
  position: fixed;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    rgba(0, 0, 0, 0.3) 4.5%,
    rgba(0, 0, 0, 0.1) 68%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const BackBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  padding: 0;
`;
