import { setupWorker } from 'msw/browser';
import {
  memberhandlers,
  presshandlers,
  folderhandles,
  articlePaginationhandlers,
} from './handlers';
import {
  subscribepresshandlers,
  pressPressArticlePaginationhandlers,
} from './subscribepresshandler';
import { unsubscribepresshandlers } from './unsubscribepresshandler';
import { subscribepresslisthandler } from './subscribepresslisthandler';
import { allpresshandlers } from './allpresshandler';
import { articlevideohandler } from './articlevideohandler';
import {
  articlelikehandler,
  articledislikehandler,
  articlehatehandler,
  articledishatehandler,
} from './articlevideointeractionhandler';
import { mypagehistoryhandler } from './historyhandler';
import { pressarticlehandler } from './pressarticlehandler';

export const worker = setupWorker(
  ...presshandlers,
  ...memberhandlers,
  ...folderhandles,
  ...subscribepresshandlers,
  ...unsubscribepresshandlers,
  ...subscribepresslisthandler,
  ...allpresshandlers,
  ...pressPressArticlePaginationhandlers,
  ...articlePaginationhandlers,
  ...articlelikehandler,
  ...articledislikehandler,
  ...articlehatehandler,
  ...articledishatehandler,
  // ...articlevideohandler,
  ...mypagehistoryhandler,
  ...pressarticlehandler,
);
