import botList from './botList';
import config from './config';

const { channel } = config.twitch;

type Commands = 'JOIN' | 'PRIVMSG' | 'PING' | 'UNKNOWN';
type Message = { type: Commands; raw: string };

const isJoinMessage = (message: string) => {
  return message.includes(`JOIN #${channel}`);
};

const isPrivateMessage = (message: string) => {
  return message.includes(`PRIVMSG #${channel}`);
};

const isPingMessage = (message: string) => {
  return message.includes('PING :tmi.twitch.tv');
};

const parseUsername = (message: string) => {
  return message.trim().substring(1, message.indexOf('!'));
};

const isNotSelf = (username: string) => {
  return username !== config.twitch.username;
};

const isRealUser = (username: string) => !botList.includes(username);

const createUniqueJoinHandler = () => {
  const users = new Set();
  return (username: string) => {
    const hasBeen = users.has(username);
    if (!hasBeen) {
      users.add(username);
    }
    return !hasBeen;
  };
};

const parser = (message: string): Message => {
  switch (true) {
    case isJoinMessage(message):
      return {
        type: 'JOIN',
        raw: message,
      };
    case isPrivateMessage(message):
      return {
        type: 'PRIVMSG',
        raw: message,
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

const isUniqueJoin = createUniqueJoinHandler();

const getConnectedUsers = (message: string) => {
  return message
    .trim()
    .split('\r\n')
    .filter(isJoinMessage)
    .map(parseUsername)
    .filter(isNotSelf)
    .filter(isRealUser)
    .filter(isUniqueJoin);
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
  createUniqueJoinHandler,
};
