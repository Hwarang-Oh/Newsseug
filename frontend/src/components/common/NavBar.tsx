import styled from 'styled-components';
import NavItem from 'components/common/NavItem';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HomeNavItem,
  SubScribeNavItem,
  ShortFormNavItem,
  SearchNavItem,
  MyPageNavItem,
} from 'components/icon/NavItemIcon';

/**
 * IMP : NavBar Component ( Navigation Bar )
 * TYPE : NavItem ( Home, Subscribe, Shortform, Search )
 * @returns
 */
function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleItemClick = (index: number, to: string) => {
    navigate(to);
  };

  return (
    <NavBarContainer>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          text={item.text}
          isMain={item.isMain}
          active={location.pathname === `/${item.route}`}
          onClick={() => handleItemClick(index, `/${item.route}`)}
        />
      ))}
    </NavBarContainer>
  );
}

export default NavBar;

/**
 * IMP : 핸드폰 화면을 고려하여, NavBar의 Width를 100%로 설정함
 */
const NavBarContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7%;
  justify-content: center;
  align-items: flex-end;
  flex-shrink: 0;
  background-color: white;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const navItems = [
  {
    text: '홈',
    route: '',
    icon: <HomeNavItem />,
  },
  {
    text: '구독',
    route: 'subscribes',
    icon: <SubScribeNavItem />,
  },
  {
    isMain: true,
    route: 'articles/1',
    icon: <ShortFormNavItem />,
  },
  {
    text: '검색',
    route: 'search',
    icon: <SearchNavItem />,
  },
  {
    text: '내 정보',
    route: 'mypage',
    icon: <MyPageNavItem />,
  },
];
