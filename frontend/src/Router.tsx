import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Scrap from './pages/Scrap';
import AllScraps from './pages/AllScraps';
import MyPage from './pages/MyPage';
import AllSubscribes from './pages/AllSubscribes';
import Subscribes from './pages/Subscribes';
import AllArticles from './pages/AllArticles';
import Login from './pages/Login';
import Search from './pages/Search';
import Splash from './pages/Splash';
import Press from './pages/Press';
import Article from './pages/Article';
import History from './pages/History';
import SearchResult from './pages/SearchResult';
import UserInput from './pages/UserInput';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserInput />} />

        <Route path="/articles">
          <Route path="all" element={<AllArticles />} />
          <Route path=":articleId" element={<Article />} />
        </Route>

        <Route path="/subscribes">
          <Route path="" element={<Subscribes />} />
          <Route path="all" element={<AllSubscribes />} />
        </Route>

        <Route path="/mypage">
          <Route path="" element={<MyPage />} />
          <Route path="scraps" element={<AllScraps />} />
          <Route path="history" element={<History />} />
          <Route path="scraps/:scrapId" element={<Scrap />} />
        </Route>

        <Route path="/search" element={<Search />} />
        <Route path="/search/result" element={<SearchResult />} />
        <Route path="/press/:pressId" element={<Press />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
