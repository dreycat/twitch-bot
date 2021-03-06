import botList from './botList';
import config from './config';

const { channel } = config.twitch;

const isPrivateMessage = (message: string) => {
  return message.includes(`PRIVMSG #${channel}`);
};

const isJoinMessage = (message: string) => {
  return !isPrivateMessage(message) && message.includes(`JOIN #${channel}`);
};

const isPingMessage = (message: string) => {
  return message.trim() === 'PING :tmi.twitch.tv';
};

const parseUsername = (message: string) => {
  return message.trim().substring(1, message.indexOf('!'));
};

const isNotSelf = (username: string) => {
  return username !== config.twitch.username;
};

const isRealUser = (username: string) => !botList.includes(username);

const getConnectedUsers = (message: string) => {
  return message
    .trim()
    .split('\r\n')
    .filter(isJoinMessage)
    .map(parseUsername)
    .filter(isNotSelf)
    .filter(isRealUser);
};

type JoinMessage = {
  type: 'JOIN';
  raw: string;
  users: string[];
};

type PrivateMessage = {
  type: 'PRIVMSG';
  raw: string;
};

type PingMessage = {
  type: 'PING';
  raw: string;
};

type UnknownMessage = {
  type: 'UNKNOWN';
  raw: string;
};

type ParsedMessage =
  | JoinMessage
  | PrivateMessage
  | PingMessage
  | UnknownMessage;

const parser = (message: string): ParsedMessage => {
  switch (true) {
    case isPrivateMessage(message):
      return {
        type: 'PRIVMSG',
        raw: message,
      };
    case isJoinMessage(message):
      return {
        type: 'JOIN',
        raw: message,
        users: getConnectedUsers(message),
      };
    case isPingMessage(message):
      return {
        type: 'PING',
        raw: message,
      };
    default:
      return {
        type: 'UNKNOWN',
        raw: message,
      };
  }
};

export {
  parser,
  parseUsername,
  getConnectedUsers,
  isNotSelf,
  isRealUser,
  isPingMessage,
  isJoinMessage,
  isPrivateMessage,
};
