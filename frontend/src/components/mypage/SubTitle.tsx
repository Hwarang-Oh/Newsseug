import { SubTitleProps } from 'types/props/mypage';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SubTitle({ title, url }: Readonly<SubTitleProps>) {
  const navigate = useNavigate();
  const handleAllBtnClick = () => {
    if (url) {
      navigate(url);
    }
  };
  return (
    <Wrapper>
      <Name>{title}</Name>
      {url ? <AllBtn onClick={handleAllBtnClick}>전체보기</AllBtn> : null}
    </Wrapper>
  );
}

export default SubTitle;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: ${({ theme }) => theme.bgColor};
`;

const Name = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.35px;
`;

const AllBtn = styled.a`
  color: ${({ theme }) => theme.mainColor};
  padding: 1px 2px;
  background: none;
  outline: none;
  border: none;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.25px;
  &:active {
    background: none;
    text-decoration: underline;
  }
`;
