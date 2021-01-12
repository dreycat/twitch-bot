require('dotenv').config();
const WebSocket = require('ws');

const Postman = require('./Postman');
const { config } = require('./config');

const {
  makeMessage,
  parseUsername,
  isJoinMessage,
  isNotSelf,
  isRealUser,
  partial,
} = require('./utils');

const { channel, username, password, URL } = config.twitch;

const ws = new WebSocket(URL);

const postman = new Postman(ws);

ws.on('open', () => {
  console.log('Connected');
  ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
  ws.send(`PASS ${password}`);
  ws.send(`NICK ${username}`);
  ws.send(`JOIN #${channel}`);
});

ws.on('close', () => {
  console.log('Disconnected');
});

ws.on('message', (message) => {
  if (!config.isProduction) {
    console.log('>>>', message);
  }

  if (message.includes('PRIVMSG')) return;

  if (message.includes('PING')) {
    ws.send('PONG');
    return;
  }

  if (isJoinMessage(channel, message)) {
    message
      .trim()
      .split('\r\n')
      .filter(partial(isJoinMessage, channel))
      .map(parseUsername)
      .filter(isNotSelf)
      .filter(isRealUser)
      .map(partial(makeMessage, channel))
      .forEach((msg) => postman.send(msg));
  }
});
