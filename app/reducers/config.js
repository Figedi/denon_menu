// @flow

import { CONFIG_ACTIONS } from '../actions/config';
import type { ReduxStandardAction } from '../actions';

export type ConfigState = { ip: string, startup: boolean, rehydrateTimeout: number };
const INITAL_STATE: ConfigState = {
  ip: '',
  startup: false,
  rehydrateTimeout: 4000,
};

function setFormField(state: ConfigState, action: ReduxStandardAction): ConfigState {
  const { field, value } = action.payload;
  return { ...state, [field]: value };
}

function toggleFormField(state: ConfigState, action: ReduxStandardAction): ConfigState {
  const { field } = action.payload;
  const old = state[field];

  return { ...state, [field]: !old };
}

export default function configReducer(state: ConfigState = INITAL_STATE, action: ReduxStandardAction): ConfigState {
  if (action.type === CONFIG_ACTIONS.setFormField) {
    return setFormField(state, action);
  } else if (action.type === CONFIG_ACTIONS.toggleFormField) {
    return toggleFormField(state, action);
  }
  return state;
}
