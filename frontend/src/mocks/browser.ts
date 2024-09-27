import { setupWorker } from 'msw/browser';
import {
  memberhandlers,
  presshandlers,
  memberfolderhandles,
  folderhandles,
  articlehandlers,
} from 'mocks/handlers';
import { subscribepresshandlers } from 'mocks/subscribepresshandler';
import { unsubscribepresshandlers } from 'mocks/unsubscribepresshandler';

export const worker = setupWorker(
  ...presshandlers,
  ...memberhandlers,
  ...memberfolderhandles,
  ...folderhandles,
  ...subscribepresshandlers,
  ...unsubscribepresshandlers,
  ...articlehandlers,
);
