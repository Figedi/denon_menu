/* eslint-disable import/prefer-default-export */
import { remote } from 'electron';

const { process } = remote;

export function quit() {
  process.exit(0);
}
