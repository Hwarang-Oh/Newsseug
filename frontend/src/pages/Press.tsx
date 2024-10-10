import PressInfo from 'components/press/PressInfo';
import SubLayout from 'components/common/SubLayout';
import PressArticles from 'components/press/PressArticles';
import CategoryFilter from 'components/common/CategoryFilter';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPressDetail } from 'apis/pressApi';
import { PressDetail } from 'types/api/press';
import { useQuery } from 'react-query';
import usePickMainImageColor from 'hooks/usePickMainImageColor';
import Spinner from 'components/common/Spinner';
import ErrorSection from 'components/common/ErrorSection';

function Press() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const { pressId } = useParams();

  const {
    data: pressDetail,
    isLoading,
    error,
  } = useQuery<PressDetail>(
    ['pressDetail', pressId],
    () => getPressDetail(Number(pressId)),
    { enabled: !!pressId },
  );

  const imgColor = usePickMainImageColor(pressDetail?.imageUrl || '');

  return (
    <SubLayout isPaddingZero={true} headerColor={imgColor}>
      <h1>{isSticky ? pressDetail?.name : null}</h1>
      <>
        {isLoading && <Spinner height="150px" />}
        {error && (
          <ErrorSection
            height="150px"
            text="언론사 정보를 불러오는 데 실패했어요...😥"
          />
        )}
        {!isLoading && !error && pressDetail && (
          <PressInfo
            id={pressDetail?.id ?? 0}
            name={pressDetail?.name ?? ''}
            imageUrl={pressDetail?.imageUrl ?? ''}
            description={pressDetail?.description ?? ''}
            subscribeCount={pressDetail?.subscribeCount ?? 0}
            isSubscribed={pressDetail?.isSubscribed ?? false}
          />
        )}

        <CategoryFilter
          isPressPage={true}
          setParentSticky={setIsSticky}
          bgColor={imgColor}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <PressArticles
          pressId={Number(pressId)}
          activeCategory={activeCategory}
        />
      </>
    </SubLayout>
  );
}

export default Press;
