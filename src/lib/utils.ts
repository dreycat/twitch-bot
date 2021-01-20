import botList from '../botList';
import config from '../config';
import { Callback } from './types';

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomItem = <T>(items: readonly T[]): T => {
  return items[getRandomIntInclusive(0, items.length - 1)];
};

export const partial = (fn: Callback, ...args: any[]) => (...rest: any[]) => {
  return fn(...args.concat(rest));
};

export const parseUsername = (message: string) => {
  return message.trim().substring(1, message.indexOf('!'));
};

export const isJoinMessage = (channel: string, message: string) => {
  return message.includes(`JOIN #${channel}`);
};

export const isNotSelf = (username: string) => {
  return username !== config.twitch.username;
};

export const isRealUser = (username: string) => !botList.includes(username);

export const createUniqueJoinHandler = () => {
  const users = new Set();
  return (username: string) => {
    const hasBeen = users.has(username);
    if (!hasBeen) {
      users.add(username);
    }
    return !hasBeen;
  };
};
