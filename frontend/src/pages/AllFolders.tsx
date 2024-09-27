import SubLayout from 'components/common/SubLayout';
import Scrap from '@/components/mypage/Folder';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import scrapPlusIcon from 'assets/scrapPlusIcon.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index';
import { MemberFolderInfo } from 'types/api/folder';
import CreateScrapModal from 'components/articles/CreateScrapModal';

function AllScraps() {
  const navigate = useNavigate();

  const memberFolderList = useSelector(
    (state: RootState) => state.memberFolder?.folders,
  );

  const handleClick = (folderId: number, title: string) => {
    navigate(`${folderId}`);
  };

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const handleCreateFolderClick = () => {
    setIsCreateOpen(true);
  };
  return (
    <SubLayout>
      <Header>
        <Title>기사.zip</Title>
        <CreateScrap onClick={handleCreateFolderClick}>
          <img src={scrapPlusIcon} alt="새 폴더 생성" />
          <span>새 폴더</span>
        </CreateScrap>
      </Header>
      <ScrapContainer>
        {isCreateOpen && (
          <CreateScrapModal
            isOpen={isCreateOpen}
            onRequestClose={() => setIsCreateOpen(false)}
          />
        )}
        {Array.isArray(memberFolderList) &&
          memberFolderList.map((folder: MemberFolderInfo) => (
            <Scrap
              key={folder.id}
              thumbnailUrl={folder.thumbnailUrl}
              scrapCnt={folder.articleCount}
              scrapTitle={folder.name}
              onClick={() => handleClick(folder.id, folder.name)}
              width="100%"
            />
          ))}
      </ScrapContainer>
    </SubLayout>
  );
}

export default AllScraps;

const CreateScrap = styled.button`
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.scrapModalColor};
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Header = styled.div`
  width: 100vw;
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
