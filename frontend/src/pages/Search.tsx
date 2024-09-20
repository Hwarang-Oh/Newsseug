import InputSection from 'components/search/InputSection';
import SubLayout from 'components/common/SubLayout';
import Keyword from 'components/search/Keyword';

const keywordlist = [
  { keywordText: '미국 ETF', isHistory: true },
  { keywordText: 'YTN', isHistory: false },
  { keywordText: '미국', isHistory: false },
];

function Search() {
  return (
    <SubLayout isSearch={true}>
      <InputSection />
      <>
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
