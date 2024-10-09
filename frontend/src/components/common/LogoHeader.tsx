import styled, { useTheme } from 'styled-components';
import LogoIcon from 'components/icon/LogoIcon';
import { LogoHeaderProps } from 'types/common/layout';
import { Helmet } from 'react-helmet-async';

/**
 * IMP : LogoHeader Component ( Logo )
 * TYPE : size? = 48
 * @param param0
 * @returns
 */

function LogoHeader({ size = 48 }: Readonly<LogoHeaderProps>) {
  const theme = useTheme();
  return (
    <LogoContainer $size={size}>
      <Helmet>
        <meta name="theme-color" content={theme.bgColor} />
      </Helmet>
      <LogoIcon size={size} />
    </LogoContainer>
  );
}

export default LogoHeader;

const LogoContainer = styled.div<{ $size: number }>`
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 6.7%;
  padding: 0px 16px;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  position: fixed;
  z-index: 5;
  top: 0;
  box-sizing: border-box;
`;
