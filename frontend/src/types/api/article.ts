/**
 * IMP : Article에 대한 Type을 정의하고 있습니다.
 * IMP : Category와 ReportType은 ENUM 타입으로 Union Literal을 사용하고 있어, type Keyword를 사용했습니다.
 * IMP : Java에서 정의된 Type을 TS로 옮긴 형태입니다.
 * TODO : 그러므로, API를 통해 받아오는 데이터의 형식을 정의하고 싶다면, 직접 추가해야 할 수도 있습니다.
 */

export interface Article {
  articleId: number;
  title: string;
  source: string;
  contentUrl: string;
  videoUrl: string;
  viewCount: number;
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
