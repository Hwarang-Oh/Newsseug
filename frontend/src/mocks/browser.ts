import { setupWorker } from 'msw/browser';

import { articleHandlers } from 'mocks/articleHandlers';
import { articleVideoHandlers } from 'mocks/articlevideoHandlers';
import { folderHandlers } from 'mocks/folderHandlers';
import { memberHandlers } from 'mocks/memberHandlers';
import { subscribeHandlers } from 'mocks/subscribeHandlers';

export const worker = setupWorker(
  ...articleHandlers,
  ...articleVideoHandlers,
  ...folderHandlers,
  ...memberHandlers,
  ...subscribeHandlers,
);
