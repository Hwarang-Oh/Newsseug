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

  const fetchVideos = async () => {
    const fetchedVideos: { [id: number]: ArticleVideoType } = {};
    const idsToFetch = articleIds.filter(
      (id: number) => !videoList.hasOwnProperty(id),
    );

    const fetchPromises = idsToFetch.map(async (id: number) => {
      const videoData = await fetchEachArticle(id);
      fetchedVideos[id] = videoData;
    });

    await Promise.all(fetchPromises);

    if (Object.keys(fetchedVideos).length > 0) {
      dispatch(setVideoList(fetchedVideos));
    }
  };

  return fetchVideos;
};
