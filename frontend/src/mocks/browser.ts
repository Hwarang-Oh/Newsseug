import { setupWorker } from 'msw/browser';
import {
  memberhandlers,
  presshandlers,
  memberfolderhandles,
  folderhandles,
  articlePaginationhandlers,
} from './handlers';
import { subscribepresshandlers } from './subscribepresshandler';
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
  ...memberfolderhandles,
  ...folderhandles,
  ...subscribepresshandlers,
  ...unsubscribepresshandlers,
  ...subscribepresslisthandler,
  ...allpresshandlers,
  ...articlevideohandler,
  ...articlePaginationhandlers,
  ...articlelikehandler,
  ...articledislikehandler,
  ...articlehatehandler,
  ...articledishatehandler,
);
