import { setupWorker } from 'msw/browser';
import {
  memberhandlers,
  presshandlers,
  folderhandles,
  articlePaginationhandlers,
} from './handlers';
import {
  subscribepresshandlers,
  pressArticlePaginationhandlers,
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
  ...pressArticlePaginationhandlers,
  ...articlevideohandler,
);
