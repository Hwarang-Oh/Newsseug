import InputSection from 'components/search/InputSection';
import SubLayout from 'components/common/SubLayout';
import Keyword from 'components/search/Keyword';
import { useEffect, useState } from 'react';
import { KeywordItem } from 'types/props/search';

const STORAGE_KEY = 'searchHistory';

function Search() {
  const [keywordHistoryList, setKeywordHistoryList] = useState<KeywordItem[]>(
    [],
  );

  useEffect(() => {
    const savedKeywords = localStorage.getItem(STORAGE_KEY);
    if (savedKeywords) {
      setKeywordHistoryList(JSON.parse(savedKeywords));
    }
  }, []);

  return (
    <SubLayout isSearch={true}>
      <InputSection />
      <>
        {keywordHistoryList.map((keyword, idx) => {
          return (
            <Keyword
              key={`${keyword.keywordText}-${idx}`}
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
