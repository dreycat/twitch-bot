import config from './config';
import { SlowEventBus } from './lib/SlowEventBus';
import { Notification } from './Notification';
import {
  parseUsername,
  isJoinMessage,
  isNotSelf,
  isRealUser,
  partial,
  createUniqueJoinHandler,
} from './lib/utils';

const { channel, username, password, URL } = config.twitch;

const bus = new SlowEventBus(5000);
const notification = new Notification('#app', 3000);
const isUniqueJoin = createUniqueJoinHandler();

bus.on('JOIN', notification.show);

const connect = () => {
  const ws = new WebSocket(URL);

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
        .filter(isUniqueJoin)
        .forEach(username => bus.emit('JOIN', username));
    }
  });

  ws.addEventListener('close', () => {
    console.log('Disconnected');
    setTimeout(connect, 2000);
  });

  ws.addEventListener('error', error => {
    console.error(error);
    ws.close();
  });
};

connect();
