import styled, { useTheme } from 'styled-components';
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
  const theme = useTheme();
  const [hexaColor, setHexaColor] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    if (headerColor) {
      const [r, g, b] = parseRgbString(headerColor);
      setHexaColor(rgbToHex(r, g, b));
      const brightness = getBrightness(r, g, b);
      if (brightness > 128) {
        setColor('#000');
      } else {
        setColor('#fff');
      }
    } else {
      setColor(theme.textColor);
    }
  }, [headerColor]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={hexaColor || theme.bgColor} />
      </Helmet>
      <Wrapper $headerColor={headerColor}>
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
              fill={color}
            />
          </svg>
        </BackBtn>
        <MainSection $color={color} $isSearch={!!isSearch}>
          {children}
        </MainSection>
      </Wrapper>
    </>
  );
}

export default SubHeader;

const Wrapper = styled.div<{ $headerColor?: string }>`
  z-index: 1000;
  padding: 12px 16px 16px 16px;
  position: fixed;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 52px;
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

const MainSection = styled.div<{ $color: string; $isSearch?: boolean }>`
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
  color: ${({ $color }) => $color};
`;
