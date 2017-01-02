// @flow
import electron from 'electron';

const AutoLaunch = electron.remote.getGlobal('AutoLaunch');

const denonLauncher = new AutoLaunch({
  name: 'Denon Remote',
});

export function enable(): Promise<boolean> {
  return getState().then((enabled) => {
    if (enabled) {
      return true;
    }
    return denonLauncher.enable();
  });
}

export function disable(): Promise<boolean> {
  return getState().then((enabled) => {
    if (enabled) {
      return denonLauncher.disable();
    }
    return true;
  });
}

export function getState(): Promise<boolean> {
  return denonLauncher.isEnabled();
}
