export config from './config';
export denon from './denon';
export electron from './electron';

export type ReduxStandardAction<P> = {
  type: string,
  payload?: P,
  error?: null | boolean,
  meta?: any,
};
