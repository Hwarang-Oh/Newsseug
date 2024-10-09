import ArrowIcon from 'assets/arrowIconWhite.svg';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

function ArticleHeader() {
  const theme = useTheme();
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.43056 12.4881C3.18981 12.2072 3.18981 11.7928 3.43056 11.5119L10.2877 3.51191C10.5573 3.19741 11.0307 3.16099 11.3452 3.43056C11.6597 3.70013 11.6962 4.1736 11.4266 4.4881L5.63067 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L5.63067 12.75L11.4266 19.5119C11.6962 19.8264 11.6597 20.2999 11.3452 20.5694C11.0307 20.839 10.5573 20.8026 10.2877 20.4881L3.43056 12.4881Z"
            fill="#fff"
          />
        </svg>
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
  max-width: 500px;
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
