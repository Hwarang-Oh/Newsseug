import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'components/login/PrivateRoute';
import Splash from 'pages/Splash';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Home from 'pages/Home';
import AllArticles from 'pages/AllArticles';
import AllSubscribes from 'pages/AllSubscribes';
import AllFolders from 'pages/AllFolders';
import MyPage from 'pages/MyPage';
import Search from 'pages/Search';
import SearchResult from 'pages/SearchResult';
import Subscribes from 'pages/Subscribes';
import Press from 'pages/Press';
import ArticleVideo from 'pages/ArticleVideo';
import History from 'pages/History';
import Folder from 'pages/Folder';
import EsSearchResult from 'pages/EsSearchResult';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/articles">
          <Route path="section/:sectionType" element={<AllArticles />} />
          <Route path=":articleId" element={<ArticleVideo />} />
        </Route>

        <Route path="/subscribes" element={<PrivateRoute />}>
          <Route path="" element={<Subscribes />} />
          <Route path="all" element={<AllSubscribes />} />{' '}
        </Route>

        <Route path="/mypage" element={<PrivateRoute />}>
          <Route path="" element={<MyPage />} />
          <Route path="folders" element={<AllFolders />} />
          <Route path="history" element={<History />} />
          <Route path="folders/:folderId" element={<Folder />} />
        </Route>

        <Route path="/search" element={<Search />} />
        <Route path="/search/result" element={<SearchResult />} />
        <Route path="/press/:pressId" element={<Press />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
