// @flow
import { createActions } from 'redux-actions';

export const CONFIG_ACTIONS = {
  setFormField: 'CONFIG_SET_FORM_FIELD',
  toggleFormField: 'CONFIG_TOGGLE_FORM_FIELD',
  commitForm: 'CONFIG_COMMIT_FORM',
  getState: 'CONFIG_GET_STATE',
};

export const actions = createActions(
  {
    [CONFIG_ACTIONS.setFormField]: (field: string, value: string | boolean) => ({ field, value }),
    [CONFIG_ACTIONS.toggleFormField]: (field: string) => ({ field }),
  },
  CONFIG_ACTIONS.commitForm,
);

// export all created actions
Object.keys(actions).forEach(actionName => {
  exports[actionName] = actions[actionName];
});
