import config from './config';

const { channel } = config.twitch;

type Commands = 'JOIN' | 'PRIVMSG' | 'PING' | 'UNKNOWN';
type Message = { type: Commands; raw: string };

export const isJoinMessage = (channel: string, message: string) => {
  return message.includes(`JOIN #${channel}`);
};

export const isPrivateMessage = (channel: string, message: string) => {
  return message.includes(`PRIVMSG #${channel}`);
};

export const isPingMessage = (message: string) => {
  return message.includes('PING :tmi.twitch.tv');
};

export const parser = (data: string): Message => {
  switch (true) {
    case isJoinMessage(channel, data):
      return {
        type: 'JOIN',
        raw: data,
      };
    case isPrivateMessage(channel, data):
      return {
        type: 'PRIVMSG',
        raw: data,
      };
    case isPingMessage(data):
      return {
        type: 'PING',
        raw: data,
      };
    default:
      return {
        type: 'UNKNOWN',
        raw: data,
      };
  }
};
