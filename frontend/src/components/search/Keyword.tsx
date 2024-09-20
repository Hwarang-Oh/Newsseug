import styled from 'styled-components';
import clockIcon from 'assets/clockIcon.svg';
import { KeywordProps } from 'types/search';
import SearchIconSvg from 'assets/searchIcon.svg';
import { useNavigate } from 'react-router-dom';

function Keyword({ isHistory = true, keywordText }: Readonly<KeywordProps>) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`result?keyword=${keywordText}`);
  };
  return (
    <Wrapper onClick={handleClick}>
      <Icon src={isHistory ? clockIcon : SearchIconSvg} />
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
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.textColor};
`;

const KeywordText = styled.p`
  height: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.textColor};
`;
