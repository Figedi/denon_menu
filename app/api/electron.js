import { remote } from 'electron';

const { process } = remote;

export function quit() {
  process.exit(0);
}
