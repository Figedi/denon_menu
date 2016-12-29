// @flow
import { remote } from 'electron';

const DenonClient = remote.require('denon_remote');

let instance = {};

function getInstance(host) {
  if (instance.instance && host === instance.host) {
    return instance.instance;
  }
  instance = {
    instance: new DenonClient({ host, retryConnect: true }),
    host,
  };

  instance.instance.once('disconnect', () => {
    instance = {};
  });
  return instance.instance;
}

/**
 * Executes a command at the denon receiver
 * @param  {host} cmd The host tosend the command to
 * @param  {string} cmd The command string to be executed
 * @return {Promise<Object>}  Returns a promise resolving with the success status
 */
function exec(host: string, cmd: string) {
  return new Promise((resolve, reject) => {
    getInstance(host).push(cmd, (clientResponse) => {
      const { error, ...rest } = clientResponse;
      if (error) {
        reject(error);
      } else {
        resolve(rest.response);
      }
    });
  });
}

export function setVolume(host: string, amount: number) {
  const normalizedAmount = parseInt((`${amount}`).replace(/\./g, ''), 10);
  return exec(host, `MV${normalizedAmount}`);
}

export function getVolume(host: string) {
  return exec(host, 'MV?').then((response) => {
    const volume = response[0].slice(2); // MV465 -> 46.5
    const volumeBits = `${volume}`.split('');

    let normalizedVolume = volume;
    if (volumeBits.length > 2) {
      volumeBits.splice(2, 0, '.');
      normalizedVolume = parseFloat(volumeBits.join(''));
    }
    return [normalizedVolume, ...response.slice(1)];
  });
}

export function setChannel(host: string, channel: string) {
  return exec(host, `SI${channel}`);
}

export function getChannel(host: string) {
  return exec(host, 'SI?');
}

export function setPower(host: string, state: string = 'ON') {
  return exec(host, `PW${state}`);
}

export function getPower(host: string) {
  return exec(host, 'PW?');
}

export function raw(host: string, cmd: string) {
  return exec(host, cmd);
}
