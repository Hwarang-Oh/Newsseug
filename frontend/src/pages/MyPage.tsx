import Folders from 'components/mypage/Folders';
import UserInfo from 'components/mypage/UserInfo';
import SubTitle from 'components/mypage/SubTitle';
import Histories from 'components/mypage/Histories';
import MainLayout from 'components/common/MainLayout';

function MyPage() {
  return (
    <MainLayout>
      <UserInfo />
      <SubTitle title="시청 기록" url="history" />
      {/* <Histories /> */}
      <SubTitle title="내 폴더" url="folders" />
      <Folders />
    </MainLayout>
  );
}

export default MyPage;
