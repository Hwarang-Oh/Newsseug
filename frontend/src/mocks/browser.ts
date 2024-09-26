import { setupWorker } from 'msw/browser';
import { presshandlers } from './presshandlers';
import { subscribepresshandlers } from './subscribepresshandler';

export const worker = setupWorker(...presshandlers, ...subscribepresshandlers);
