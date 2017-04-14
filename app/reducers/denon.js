// @flow

import { DENON_ACTIONS } from '../actions/denon';
import type { ReduxStandardAction } from '../actions';
import { promiseHelpers } from '../utils';

const CONSTANTS = promiseHelpers.getPendingSymbols(DENON_ACTIONS);

export type DenonState = { $pending: Array<string>, power: string, volume: number, channel: string };

const INITAL_STATE: DenonState = {
  $error: null,
  $pending: [],
  power: 'STANDBY',
  volume: 30,
  channel: 'TV',
};

function setOptimistic(state: DenonState, field: string, value: string | number): DenonState {
  return { ...state, [field]: value };
}

function setVolume(state: DenonState, action: ReduxStandardAction): DenonState {
  if (action.payload.code === 1) {
    return state;
  }
  const volume = action.payload.response[0]; // already normalized in API
  return { ...unsetPending(state, 'getVolume'), volume };
}

function setChannel(state: DenonState, action: ReduxStandardAction): DenonState {
  if (action.payload.code === 1) {
    return state;
  }
  const channel = action.payload.response[0].slice(2); // SISAT -> SAT
  return { ...unsetPending(state, 'getChannel'), channel };
}

function setPower(state: DenonState, action: ReduxStandardAction): DenonState {
  const power = action.payload.response[0].slice(2); // PWON -> ON
  return { ...unsetPending(state, 'getPower'), power };
}

function setPending(state: DenonState, pendingAction: string): DenonState {
  const $pending = [...state.$pending, pendingAction];
  return { ...state, $pending };
}

function unsetPending(state: DenonState, unsetAction: string): DenonState {
  const $pending = state.$pending.filter(pendingAction => pendingAction !== unsetAction);
  return { ...state, $pending };
}

function resetPending(state: DenonState, action: ReduxStandardAction): DenonState {
  return { ...state, $pending: [], $error: action.payload };
}

function resetAll(): DenonState {
  return INITAL_STATE;
}

export default function denonReducer(state: DenonState = INITAL_STATE, action: ReduxStandardAction): DenonState {
  switch (action.type) {
    case DENON_ACTIONS.reset:
      return resetAll();
    case DENON_ACTIONS.error:
      return resetPending(state, action);
    case CONSTANTS.getVolume.pending:
      return setPending(state, 'getVolume');
    case CONSTANTS.getVolume.fulfilled:
      return setVolume(state, action);
    case CONSTANTS.getChannel.pending:
      return setPending(state, 'getChannel');
    case CONSTANTS.getChannel.fulfilled:
      return setChannel(state, action);
    case CONSTANTS.getPower.pending:
      return setPending(state, 'getPower');
    case CONSTANTS.getPower.fulfilled:
      return setPower(state, action);
    case CONSTANTS.setChannel.pending:
      return setOptimistic(state, 'channel', action.payload.args[1]);
    case CONSTANTS.setPower.pending:
      return setOptimistic(state, 'power', action.payload.args[1]);
    case CONSTANTS.commitVolume.$symbol:
      return setOptimistic(state, 'volume', action.payload.amount);
    default:
      return state;
  }
}
