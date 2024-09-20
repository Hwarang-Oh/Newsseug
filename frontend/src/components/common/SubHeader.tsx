import styled from 'styled-components';
import ArrowIcon from 'assets/arrowIcon.svg';
import { useNavigate } from 'react-router-dom';
import { SubLayoutProps } from '@/types/common/layout';

/**
 * IMP : SubHeader Component ( SubLayout ) => BackBtn ( 뒤로가기 ), MainSection ( children )
 * TYPE : children, isSearch?, headerColor?
 * @param param0
 * @returns
 */

function SubHeader({
  children,
  isSearch = false,
  headerColor,
}: Readonly<SubLayoutProps>) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Wrapper $headerColor={headerColor}>
      <BackBtn onClick={handleGoBack}>
        <img src={ArrowIcon} alt="back arrow icon" />
      </BackBtn>
      <MainSection $isSearch={!!isSearch}>{children}</MainSection>
    </Wrapper>
  );
}

export default SubHeader;

const Wrapper = styled.div<{ $headerColor?: string }>`
  z-index: 1000;
  padding: 12px 16px;
  position: fixed;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background-color: ${({ $headerColor, theme }) =>
    $headerColor ?? theme.bgColor};
`;

const BackBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus {
    transition: 0.2s;
    background-color: ${({ theme }) => theme.relaxColor.light + 70};
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const MainSection = styled.div<{ $isSearch?: boolean }>`
  display: flex;
  width: ${({ $isSearch }) => ($isSearch ? 'fit-content' : 'auto')};
  padding: 6px 12px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  position: ${({ $isSearch }) => ($isSearch ? 'static' : 'absolute')};
  top: ${({ $isSearch }) => ($isSearch ? 'auto' : '50%')};
  left: ${({ $isSearch }) => ($isSearch ? 'auto' : '50%')};
  transform: ${({ $isSearch }) =>
    $isSearch ? 'none' : 'translate(-50%, -50%)'};
  border: ${({ $isSearch, theme }) =>
    $isSearch ? `1px solid ${theme.relaxColor.light}` : 'none'};
  flex-grow: ${({ $isSearch }) => ($isSearch ? 1 : 0)};
`;
