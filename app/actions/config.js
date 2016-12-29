// @flow
import { createAction } from 'redux-actions';

import { startup as startupApi } from '../api';

export const CONFIG_ACTIONS = {
  setFormField: 'CONFIG/SET_FORM_FIELD',
  toggleFormField: 'CONFIG/TOGGLE_FORM_FIELD',
  applyForm: 'CONFIG/APPLY_FORM',
  getState: 'CONFIG/GET_STATE',
};

export const setFormField = createAction(CONFIG_ACTIONS.setFormField, (field: string, value: string) => ({ field, value }));

export const toggleFormField = createAction(CONFIG_ACTIONS.toggleFormField, (field: string) => ({ field }));

export const getState = createAction(CONFIG_ACTIONS.getState);

export const applyForm = createAction(CONFIG_ACTIONS.applyForm, async (ip: string, startup: boolean) => {
  let response;
  if (startup) {
    response = await startupApi.enable();
  } else {
    response = await startupApi.disable();
  }
  return response;
});
