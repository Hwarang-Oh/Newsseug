import styled, { useTheme } from 'styled-components';
import { KeywordProps } from 'types/props/search';
import { useNavigate } from 'react-router-dom';

function Keyword({ isHistory = true, keywordText }: Readonly<KeywordProps>) {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleClick = () => {
    navigate(`result?keyword=${keywordText}`);
  };
  return (
    <Wrapper onClick={handleClick}>
      {!isHistory ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.1684 12.1844C8.62979 14.2177 4.91375 14.0577 2.56043 11.7043C0.0354176 9.17932 0.0354176 5.08545 2.56043 2.56044C5.08545 0.035417 9.17931 0.0354174 11.7043 2.56044C14.0576 4.91375 14.2177 8.62978 12.1844 11.1684L17.1229 16.1069C17.4035 16.3875 17.4035 16.8424 17.1229 17.1229C16.8424 17.4035 16.3875 17.4035 16.1069 17.1229L11.1684 12.1844ZM3.57642 10.6883C1.61252 8.72444 1.61252 5.54033 3.57642 3.57642C5.54032 1.61252 8.72444 1.61252 10.6883 3.57642C12.6508 5.53889 12.6522 8.71977 10.6927 10.684C10.6912 10.6854 10.6898 10.6869 10.6883 10.6883C10.6869 10.6898 10.6854 10.6912 10.684 10.6927C8.71977 12.6522 5.53889 12.6508 3.57642 10.6883Z"
            fill={theme.textColor}
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.00002 16.0834C12.912 16.0834 16.0834 12.912 16.0834 9.00002C16.0834 5.088 12.912 1.91669 9.00002 1.91669C5.088 1.91669 1.91669 5.088 1.91669 9.00002C1.91669 12.912 5.088 16.0834 9.00002 16.0834ZM9.00002 17.3334C13.6024 17.3334 17.3334 13.6024 17.3334 9.00002C17.3334 4.39765 13.6024 0.666687 9.00002 0.666687C4.39765 0.666687 0.666687 4.39765 0.666687 9.00002C0.666687 13.6024 4.39765 17.3334 9.00002 17.3334Z"
            fill={theme.textColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.00002 3.99791C9.3452 3.99791 9.62502 4.27773 9.62502 4.62291V9.51166L12.28 11.4081C12.5608 11.6088 12.6259 11.9991 12.4253 12.28C12.2246 12.5609 11.8343 12.6259 11.5534 12.4253L8.63674 10.3419C8.4725 10.2246 8.37502 10.0351 8.37502 9.83329V4.62291C8.37502 4.27773 8.65484 3.99791 9.00002 3.99791Z"
            fill={theme.textColor}
          />
        </svg>
      )}
      <KeywordText>{keywordText}</KeywordText>
    </Wrapper>
  );
}

export default Keyword;

const Wrapper = styled.div`
  width: 100%;
  height: 52px;
  padding: 16px 0;
  box-sizing: border-box;
  gap: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const KeywordText = styled.p`
  height: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.textColor};
`;
