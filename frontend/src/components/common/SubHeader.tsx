import styled from 'styled-components';
import ArrowIcon from 'assets/arrowIcon.svg';
import ArrowIconWhite from 'assets/arrowIconWhite.svg';
import { useNavigate } from 'react-router-dom';
import { SubLayoutProps } from 'types/common/layout';
import { useEffect, useState } from 'react';
import { parseRgbString } from 'utils/parseRgbString';
import { getBrightness } from 'utils/getBrightness';
import { Helmet } from 'react-helmet-async';
import { rgbToHex } from 'utils/rgbToHex';

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
  const [brightness, setBrightness] = useState<number>(0);
  const [hexaColor, setHexaColor] = useState<string>('');

  useEffect(() => {
    if (headerColor) {
      const [r, g, b] = parseRgbString(headerColor);
      setHexaColor(rgbToHex(r, g, b));
      setBrightness(getBrightness(r, g, b));
    }
  }, [headerColor]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={hexaColor} />
      </Helmet>
      <Wrapper $headerColor={headerColor}>
        <BackBtn onClick={handleGoBack}>
          <img
            src={brightness > 128 ? ArrowIcon : ArrowIconWhite}
            alt="back arrow icon"
          />
        </BackBtn>
        <MainSection $brightness={brightness} $isSearch={!!isSearch}>
          {children}
        </MainSection>
      </Wrapper>
    </>
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
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  &:focus {
    transition: 0.2s;
    background-color: ${({ theme }) => theme.relaxColor.light + 70};
  }
`;

const MainSection = styled.div<{ $brightness: number; $isSearch?: boolean }>`
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
  color: ${({ $brightness }) => ($brightness > 128 ? '#202020' : '#fff')};
`;
