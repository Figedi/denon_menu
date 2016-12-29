// @flow
import { createAction } from 'redux-actions';

import { electron } from '../api';

export const ELECTRON_ACTIONS = {
  quit: 'QUIT',
};

export const quit = createAction(ELECTRON_ACTIONS.quit, async () => {
  electron.quit();
  // who are we kidding, this is never executed after process exit
});
