import styled from 'styled-components';
import { NavItemProps } from 'types/common/layout';

/**
 * IMP : NavItem Component ( Navigation Item )
 * Type : NavItem ( icon, text?, isMain?, active, onClick )
 * @param param0
 * @returns
 */
function NavItem({
  icon,
  text,
  isMain,
  active,
  onClick,
}: Readonly<NavItemProps>) {
  return (
    <NavItemContainer $active={active} $isMain={isMain} onClick={onClick}>
      {icon}
      <NavText>{text}</NavText>
    </NavItemContainer>
  );
}

export default NavItem;

const NavItemContainer = styled.div<{
  $active?: boolean;
  $isMain?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  align-self: center;
  cursor: pointer;

  position: relative;
  top: ${({ $isMain }) => ($isMain ? '-25px' : '0')};
  ${({ $isMain, $active, theme }) =>
    !$isMain &&
    `
    svg path {
      fill: ${$active ? theme.mainColor : theme.relaxColor.dark};
    }
  `}
`;

const NavText = styled.span`
  color: ${({ theme }) => theme.relaxColor.dark};
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
