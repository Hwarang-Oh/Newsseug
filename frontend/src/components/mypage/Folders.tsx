import styled from 'styled-components';
import Folder from './Folder';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { MemberFolder, MemberFolderInfo } from 'types/api/folder';
import { getMemberFolderList } from 'apis/memberApi';
import Spinner from '../common/Spinner';
import ErrorSection from '../common/ErrorSection';

function Folders() {
  const navigate = useNavigate();
  const width = '144px';
  const height = '192px';
  const handleClick = (folderId: number, title: string) => {
    navigate(`folders/${folderId}`, { state: { title } });
  };

  const {
    data: memberFolderData,
    isLoading,
    error,
  } = useQuery<MemberFolder>(['memberFolderData'], () =>
    getMemberFolderList(0),
  );

  if (isLoading) {
    return <Spinner height={height} />;
  }

  if (error) {
    return (
      <ErrorSection
        height={height}
        text="폴더 목록을 불러오는 데 실패했어요...😥"
      />
    );
  }

  return (
    <Wrapper>
      {memberFolderData &&
        Array.isArray(memberFolderData?.content) &&
        (memberFolderData.content.length > 0 ? (
          memberFolderData?.content?.map((folder: MemberFolderInfo) => (
            <Folder
              key={folder.id}
              width={width}
              height={height}
              thumbnailUrl={folder.thumbnailUrl}
              folderCnt={folder.articleCount}
              folderTitle={folder.title}
              onClick={() => handleClick(folder.id, folder.title)}
            />
          ))
        ) : (
          <ErrorSection height={height} text="폴더 목록이 없습니다." />
        ))}
    </Wrapper>
  );
}

export default Folders;

const Wrapper = styled.div`
  display: flex;
  width: 100%; /* 부모 요소의 너비에 맞춤 */
  max-width: 100%; /* 최대 부모 요소의 너비만큼 차지 */
  align-items: flex-start;
  gap: 8px;
  overflow-x: auto; /* x축 스크롤 가능 */
  white-space: nowrap; /* 자식 요소들이 줄바꿈되지 않도록 설정 */
  scroll-behavior: smooth; /* 부드러운 스크롤 */

  & > * {
    flex-shrink: 0; /* 자식 요소가 축소되지 않도록 설정 */
  }

  /* 스크롤 바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
  -ms-overflow-style: none;
`;
