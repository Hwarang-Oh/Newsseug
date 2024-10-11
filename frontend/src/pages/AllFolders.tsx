import styled from 'styled-components';
import Folder from 'components/mypage/Folder';
import SubLayout from 'components/common/SubLayout';
import scrapPlusIcon from 'assets/scrapPlusIcon.svg';
import CreateScrapModal from 'components/articles/CreateScrapModal';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MemberFolderInfo } from 'types/api/folder';
import { getMemberFolderList } from 'apis/memberApi';
import ErrorSection from 'components/common/ErrorSection';
import Spinner from 'components/common/Spinner';

function AllFolders() {
  const navigate = useNavigate();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    'folders',
    ({ pageParam = 0 }) => getMemberFolderList(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.sliceDetails.hasNext) {
          return lastPage.sliceDetails.currentPage + 1;
        }
        return undefined;
      },
    },
  );

  const handleClick = (folderId: number) => {
    navigate(`${folderId}`);
  };

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const handleCreateFolderClick = () => {
    setIsCreateOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (
        scrollHeight - scrollTop <= clientHeight * 1.5 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <SubLayout>
      <Header>
        <Title>내 폴더</Title>
        <CreateScrap onClick={handleCreateFolderClick}>
          <img src={scrapPlusIcon} alt="새 폴더 생성" />
          <span>새 폴더</span>
        </CreateScrap>
      </Header>
      {isError && (
        <ErrorSection
          text="내 폴더 목록을 불러오는 데 실패했어요...😥"
          height="300px"
        />
      )}
      {isLoading && <Spinner height="300px" />}
      <ScrapContainer>
        {!isError &&
          !isLoading &&
          (data && data.pages.length > 0 ? (
            data?.pages.map((page) =>
              page.content.map((folder: MemberFolderInfo) => (
                <Folder
                  key={folder.id}
                  thumbnailUrl={folder.thumbnailUrl}
                  folderCnt={folder.articleCount}
                  folderTitle={folder.title}
                  onClick={() => handleClick(folder.id)}
                  width="100%"
                />
              )),
            )
          ) : (
            <ErrorSection text="폴더 목록이 없습니다." height="300px" />
          ))}

        {isFetchingNextPage && <Spinner height="50px" />}
      </ScrapContainer>
    </SubLayout>
  );
}

export default AllFolders;

const CreateScrap = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 20px;
  &:active {
    background-color: ${({ theme }) => theme.textColor + '3b'};
    transition: none;
  }

  &:not(:active) {
    transition: background-color 0.5s;
  }
  position: absolute;
  right: 16px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Header = styled.div`
  width: 100vw;
  max-width: 500px;
  display: flex;
  align-items: center;
  position: relative;
`;

const ScrapContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 16px;
`;
