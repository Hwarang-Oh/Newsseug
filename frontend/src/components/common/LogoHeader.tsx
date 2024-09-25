import styled from 'styled-components';
import LogoIcon from 'components/icon/LogoIcon';
import { LogoHeaderProps } from 'types/common/layout';

/**
 * IMP : LogoHeader Component ( Logo )
 * TYPE : size? = 48
 * @param param0
 * @returns
 */
function LogoHeader({ size = 48 }: Readonly<LogoHeaderProps>) {
  return (
    <LogoContainer $size={size}>
      <LogoIcon size={size} />
    </LogoContainer>
  );
}

export default LogoHeader;

const LogoContainer = styled.div<{ $size: number }>`
  display: flex;
  width: 100%;
  height: 6.7%;
  padding: 0px 16px;
  align-items: center;
  background-color: white;
  position: fixed;
  z-index: 5;
  top: 0;
`;
