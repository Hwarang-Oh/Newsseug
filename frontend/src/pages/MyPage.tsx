import UserInfo from 'components/mypage/UserInfo';
import MainLayout from 'components/common/MainLayout';
import SubTitle from 'components/mypage/SubTitle';
import Histories from 'components/mypage/Histories';
import Scraps from 'components/mypage/Scraps';

function MyPage() {
  return (
    <MainLayout>
      <UserInfo />
      <SubTitle title="시청 기록" url="history" />
      {/* <Histories /> */}
      <SubTitle title="스크랩" url="folders" />
      <Scraps />
    </MainLayout>
  );
}

export default MyPage;
