import { useDispatch, useSelector } from 'react-redux';
import { fetchEachArticle } from 'apis/articleVideoApi';
import { setVideoList } from '../redux/articleSlice';
import { RootState } from '../redux/index';
import { ArticleVideo as ArticleVideoType } from 'types/api/articleVideo';

export const useFetchVideos = () => {
  const dispatch = useDispatch();
  const { articleIds, videoList } = useSelector(
    (state: RootState) => state.articles,
  );

  const fetchVideos = async (activeIndex: number) => {
    const start = Math.max(activeIndex - 3, 0);
    const end = Math.min(articleIds.length - 1, activeIndex + 3);
    const idList = articleIds.slice(start, end + 1);

    const fetchedVideos: { [id: number]: ArticleVideoType } = {};

    for (const id of idList) {
      if (!videoList.hasOwnProperty(id)) {
        const videoData = await fetchEachArticle(id);
        console.log(`${id} 비디오 호출`);
        fetchedVideos[id] = videoData; // 각 id를 키로 저장
      }
    }

    if (Object.keys(fetchedVideos).length > 0) {
      dispatch(setVideoList(fetchedVideos));
    }
  };

  return fetchVideos;
};
