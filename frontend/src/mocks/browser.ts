import { setupWorker } from 'msw/browser';
import {
  memberhandlers,
  presshandlers,
  memberfolderhandles,
  folderhandles,
} from './handlers';
import { subscribepresshandlers } from './subscribepresshandler';

export const worker = setupWorker(
  ...presshandlers,
  ...memberhandlers,
  ...memberfolderhandles,
  ...folderhandles,
  ...subscribepresshandlers,
);
