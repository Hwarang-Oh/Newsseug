import PressCard from 'components/search/PressCard';
import CategoryFilter from 'components/common/CategoryFilter';
import SubLayout from 'components/common/SubLayout';
import InputSection from 'components/search/InputSection';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';

const dummydata = [
  {
    isPress: true,
  },
  [
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/667a/5ec0/17d320f067f72c7c0715dd9d1850d4fc?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hWM89vxi11NLSDAYOnvPfg35sMTalordg5aZQ-huHZZufY4lfIPR12tVBlHpuojcmpcNyOhk2WlihG8sAHNaUtxkPzEbqu7rvv-GHp3qR1qoIV~MPHS~UKhCg9CsjeQhj7hpnyJ93WqKXG6RFMLi1LUeiKlx4a3xmhM8muh68EX2d0nvm0oAE~MiJixrAWtvuuCKxO~m1ieQ1ZkIcXSxvk1RJ4t-Tt0bsowjuV~KB4hocdrdxVo0vlJ2amURMrxI0PburQjpFlDbbIHte6vjQmb8kZOTP9Bk9BiM9uDtaMvBL1oAUba-lh0KaBEQb~1U19mJ-0obCtJjIV4AhmKWzg__',
      title: '전국 민속놀이 대회 개최 소식',
      viewCount: 123456789,
      pressName: 'KBS',
    },
    {
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/667a/5ec0/17d320f067f72c7c0715dd9d1850d4fc?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hWM89vxi11NLSDAYOnvPfg35sMTalordg5aZQ-huHZZufY4lfIPR12tVBlHpuojcmpcNyOhk2WlihG8sAHNaUtxkPzEbqu7rvv-GHp3qR1qoIV~MPHS~UKhCg9CsjeQhj7hpnyJ93WqKXG6RFMLi1LUeiKlx4a3xmhM8muh68EX2d0nvm0oAE~MiJixrAWtvuuCKxO~m1ieQ1ZkIcXSxvk1RJ4t-Tt0bsowjuV~KB4hocdrdxVo0vlJ2amURMrxI0PburQjpFlDbbIHte6vjQmb8kZOTP9Bk9BiM9uDtaMvBL1oAUba-lh0KaBEQb~1U19mJ-0obCtJjIV4AhmKWzg__',
      title: 'AI 기술 발전 속도 증가',
      viewCount: 987654321,
      pressName: 'MBC',
    },
  ],
];

function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword: string = searchParams.get('keyword') ?? '';
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  return (
    <SubLayout isSearch={true}>
      <InputSection keywordText={keyword} />
      <>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        {dummydata.map((item, idx) => {
          if (Array.isArray(item)) {
            return <ArticleListCardGroup key={idx} articleList={item} />;
          } else if (typeof item === 'object' && item != null) {
            return <PressCard key={idx} />;
          }
        })}
      </>
    </SubLayout>
  );
}

export default SearchResult;
