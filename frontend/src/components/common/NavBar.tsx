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
import { fetchArticles, fetchRandomArticles } from 'apis/articleApi';
import { useDispatch } from 'react-redux';
import {
  setActiveCategory,
  setArticleFrom,
  setArticleIds,
  setSliceDetail,
} from '../../redux/articleSlice';
import { ArticleListCardProps } from 'types/common/common';
import { SliceDetails } from 'types/api/article';
import { getCookie } from 'utils/stateUtils';

/**
 * IMP : NavBar Component ( Navigation Bar )
 * TYPE : NavItem ( Home, Subscribe, Shortform, Search )
 * @returns
 */
function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const isAuthenticated = () => {
    const token = getCookie('AccessToken');
    return !!token; // 토큰이 있으면 true, 없으면 false
  };

  const articleDispatch = (
    articleList: ArticleListCardProps[],
    sliceDetails: SliceDetails,
    articleFrom: string,
  ) => {
    dispatch(setArticleIds(articleList.map((article) => article.id)));
    dispatch(setArticleFrom(articleFrom));
    dispatch(setSliceDetail(sliceDetails ?? {}));
    dispatch(setActiveCategory('all'));
  };

  const handleItemClick = async (index: number, to: string) => {
    if (index === 2) {
      try {
        let article;
        if (!isAuthenticated()) {
          article = await fetchArticles({ category: 'ALL', page: 0 });
          articleDispatch(article.content, article.sliceDetails, 'all');
        } else {
          article = await fetchRandomArticles();
          articleDispatch(article.content, article.sliceDetails, 'newsseug');
        }
        console.log(article.content[0].id);
        navigate(`/articles/${article.content[0].id}`);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    } else {
      navigate(to);
    }
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
  top: auto;
  width: 100%;
  max-width: 500px;
  height: 8%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px -10px 100px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0;
  padding-bottom: 15px;
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
