import PressInfo from 'components/press/PressInfo';
import SubLayout from 'components/common/SubLayout';
import PressArticles from 'components/press/PressArticles';
import CategoryFilter from 'components/common/CategoryFilter';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPressDetail } from 'apis/pressApi';
import { PressDetail } from 'types/api/press';
import { useQuery } from 'react-query';
import ColorThief from 'colorthief';

function Press() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [imgColor, setImgColor] = useState<string>('');
  const { pressId } = useParams();

  const {
    data: pressDetail,
    isLoading,
    error,
  } = useQuery<PressDetail>(
    ['pressDetail', pressId],
    () => getPressDetail(Number(pressId)),
    {
      enabled: !!pressId,
    },
  );

  useEffect(() => {
    if (pressDetail?.imageUrl) {
      const img = new Image();
      const colorThief = new ColorThief();
      img.src = pressDetail.imageUrl;
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const color = colorThief.getColor(img);
        setImgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      };

      if (img.complete) {
        const color = colorThief.getColor(img);
        setImgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      }
    }
  }, [pressDetail?.imageUrl]);

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';
    return <div>언론사 정보 조회 실패: {errorMessage}</div>;
  }

  return (
    <SubLayout isPaddingZero={true} headerColor={imgColor}>
      <h1>{isSticky ? pressDetail?.name : null}</h1>
      <>
        <PressInfo
          name={pressDetail?.name ?? ''}
          imageUrl={pressDetail?.imageUrl ?? ''}
          pressId={pressDetail?.pressId ?? 0}
          description={pressDetail?.description ?? ''}
          subscribeCount={pressDetail?.subscribeCount ?? 0}
        />

        <CategoryFilter
          isPressPage={true}
          setParentSticky={setIsSticky}
          bgColor={imgColor}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <PressArticles />
      </>
    </SubLayout>
  );
}

export default Press;
