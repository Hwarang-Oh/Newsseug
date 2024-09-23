import InputSection from 'components/search/InputSection';
import SubLayout from 'components/common/SubLayout';
import Keyword from 'components/search/Keyword';
import { useState } from 'react';
import ScrapModal from 'components/articles/ScrapModal';

const keywordlist = [
  { keywordText: '미국 ETF', isHistory: true },
  { keywordText: 'YTN', isHistory: false },
  { keywordText: '미국', isHistory: false },
];

function Search() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <SubLayout isSearch={true}>
      <InputSection />
      <>
        <button style={{ height: '100px' }} onClick={handleClick}>
          스크랩
        </button>
        {isModalOpen && (
          <ScrapModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          />
        )}
        {keywordlist.map((keyword, idx) => {
          return (
            <Keyword
              key={idx}
              isHistory={keyword.isHistory}
              keywordText={keyword.keywordText}
            />
          );
        })}
      </>
    </SubLayout>
  );
}

export default Search;
