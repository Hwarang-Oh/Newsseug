import { setupWorker } from 'msw/browser';
import { presshandlers } from './presshandlers';

export const pressworker = setupWorker(...presshandlers);
