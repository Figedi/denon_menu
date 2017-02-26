// @flow
import { createActions } from 'redux-actions';

const DENON_ACTIONS = exports.DENON_ACTIONS = {
  setVolume: 'DENON_SET_VOLUME',
  commitVolume: 'DENON_COMMIT_VOLUME',
  getVolume: 'DENON_GET_VOLUME',
  setChannel: 'DENON_SET_CHANNEL',
  getChannel: 'DENON_GET_CHANNEL',
  setPower: 'DENON_SET_POWER',
  getPower: 'DENON_GET_POWER',
  startInterval: 'DENON_START_INTERVAL',
  stopInterval: 'DENON_STOP_INTERVAL',
  raw: 'DENON_RAW',
  error: 'DENON_ERROR',
  reset: 'DENON_RESET',
};

const getActions = createActions({
  [DENON_ACTIONS.getVolume]: (host: string) => ({ method: 'getVolume', args: [host] }),
  [DENON_ACTIONS.getChannel]: (host: string) => ({ method: 'getChannel', args: [host] }),
  [DENON_ACTIONS.getPower]: (host: string) => ({ method: 'getPower', args: [host] }),
});

const setActions = createActions({
  [DENON_ACTIONS.setChannel]: (host: string, channel: string) => ({ method: 'setChannel', args: [host, channel] }),
  [DENON_ACTIONS.setPower]: (host: string, state: string) => ({ method: 'setPower', args: [host, state] }),
  [DENON_ACTIONS.setVolume]: (host: string, amount: number) => ({ method: 'setVolume', args: [host, amount] }),
  [DENON_ACTIONS.raw]: (host: string, cmd: string) => ({ method: 'raw', args: [host, cmd] }),
  [DENON_ACTIONS.error]: (error: Error) => ({ error }),
  // special case for setVolume -> allow premature updates and only commit afterwards
  [DENON_ACTIONS.commitVolume]: (amount: number) => ({ amount }),
}, DENON_ACTIONS.startInterval, DENON_ACTIONS.stopInterval, DENON_ACTIONS.reset);


const actions = exports.actions = { ...getActions, ...setActions };
// export all created actions
Object.keys(actions).map((actionName) => (exports[actionName] = actions[actionName]));
