import config from './config';
import { SlowEventBus } from './lib/SlowEventBus';
import { Notification } from './Notification';
import {
  parseUsername,
  isJoinMessage,
  isNotSelf,
  isRealUser,
  partial,
} from './lib/utils';

const { channel, username, password, URL } = config.twitch;

const ws = new WebSocket(URL);
const bus = new SlowEventBus(5000);
const notification = new Notification('#app', 3000);

bus.on('JOIN', notification.show);

ws.addEventListener('open', () => {
  console.log('Connected');
  ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
  ws.send(`PASS ${password}`);
  ws.send(`NICK ${username}`);
  ws.send(`JOIN #${channel}`);
});

ws.addEventListener('message', event => {
  const message = event.data as string;

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
      .forEach(username => bus.emit('JOIN', username));
  }
});

ws.addEventListener('close', () => {
  console.log('Disconnected');
});

ws.addEventListener('error', error => {
  console.error(error);
  ws.close();
});
