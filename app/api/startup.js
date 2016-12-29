// @flow

import { remote } from 'electron';

const AutoLaunch = remote.require('auto-launch');

const denonLauncher = new AutoLaunch({
  name: 'Denon Remote',
  mac: {
    useLaunchAgent: true,
  },
});

export function enable(): Promise<boolean> {
  return denonLauncher.enable();
}

export function disable(): Promise<boolean> {
  return denonLauncher.disable();
}

export function getState(): Promise<boolean> {
  return denonLauncher.isEnabled();
}
