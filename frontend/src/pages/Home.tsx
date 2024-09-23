import MainLayout from 'components/common/MainLayout';
import data from 'db/data.json';
import Section from 'components/home/Section';
import UserInput from './UserInput';
import AllArticles from './AllArticles';
import ConfirmModal from 'components/userInput/ConfirmModal';

/**
 * IMP : Home Page
 * TODO : Home Page의 Section에서 '더보기'를 누르면 All Articles Page로 이동하도록 구현
 * @returns
 */
function Home() {
  return (
    <MainLayout>
      {data.todyNews.map((data, index) => (
        <Section
          key={index}
          subTitle={data.subTitle}
          moreLink={'/'}
          articleList={data.ArticleList}
        />
      ))}
    </MainLayout>
  );
}

export default Home;
