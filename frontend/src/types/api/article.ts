/**
 * IMP : Article API Response Type 정의
 * @property {number} articleId - 기사 ID
 * @property {string} pressName - 언론사 이름
 * @property {string} thumbnailUrl - 썸네일 URL
 * @property {string} title - 제목
 * @property {number} viewCount - 조회수
 */
export interface Article {
  articleId: number;
  pressName: string;
  thumbnailUrl: string;
  title: string;
  viewCount: number;
}

/**
 * IMP : ArticleDetail API Response Type 정의
 * @extends Article
 * @property {string} source - 기사 출처
 * @property {string} contentUrl - 기사 본문 URL
 * @property {string} videoUrl - 관련 동영상 URL
 * @property {Category} category - 카테고리 정보
 * @property {Like[]} likes - 좋아요 리스트
 * @property {Hate[]} hates - 싫어요 리스트
 * @property {History[]} histories - 히스토리 기록
 * @property {Report[]} reports - 신고 내역
 * @property {Date} createdAt - 생성일
 * @property {Date} updatedAt - 수정일
 */
interface ArticleDetail extends Article {
  source: string;
  contentUrl: string;
  videoUrl: string;
  category: Category;
  likes: Like[];
  hates: Hate[];
  histories: History[];
  reports: Report[];
  createdAt: Date;
  updatedAt: Date;
}

// Type : 정치, 경제, 외교, 사건, 과학
type Category = 'POLITICS' | 'ECONOMY' | 'DIPLOMACY' | 'INCIDENTS' | 'SCIENCE';

// Type : "마음에 들지 않습니다.", "스팸", "혐오 발언 또는 상징", "거짓 정보", "선정적인 컨텐츠"
type ReportType =
  | 'DISLIKE'
  | 'SPAM'
  | 'HATE_SPEECH_OR_SYMBOLS'
  | 'MISINFORMATION'
  | 'EXPLICIT_CONTENT';

interface Like {
  likeId: number;
  memberId: number;
  articleId: number;
  createdAt: Date;
}

interface Hate {
  hateId: number;
  memberId: number;
  articleId: number;
  createdAt: Date;
}

interface Report {
  reportId: number;
  articleId: number;
  reportType: ReportType;
  createdAt: Date;
}
