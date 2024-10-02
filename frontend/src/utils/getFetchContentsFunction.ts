import { fetchArticles, fetchArticlesByToday } from 'apis/articleApi';
import { SectionType } from 'types/api/article';

export const getAPIFunctionBySectionType = (sectionType: SectionType) => {
  switch (sectionType) {
    case 'today':
      return fetchArticlesByToday;
    case 'age':
    case 'all':
      return fetchArticles;
    default:
      return fetchArticles;
  }
};
