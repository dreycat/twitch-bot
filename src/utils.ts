import cars from './cars';
import botList from './botList';
import config from './config';
import { Callback } from './types';

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = (items: any[]) => {
  return items[getRandomIntInclusive(0, items.length - 1)];
};

export const makeMessage = (channel: string, username: string) => {
  const message = `К нам подъехал @${username} на ${getRandomItem(cars)}`;
  return `PRIVMSG #${channel} :${message}`;
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
