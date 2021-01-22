import config from './config';
import { SlowEventBus } from './lib/SlowEventBus';
import { Notification } from './Notification';

import { parser } from './parser';

const { channel, username, password, URL } = config.twitch;

const bus = new SlowEventBus(10000);
const notification = new Notification('#app', 4000);

bus.on('JOIN', username => notification.show(username));

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
    const data = event.data as string;

    if (!config.isProduction) {
      console.log('>>>', data);
    }

    const msg = parser(data);

    switch (msg.type) {
      case 'PING':
        ws.send('PONG');
        break;
      case 'JOIN':
        msg.users.forEach(username => bus.emit('JOIN', username));
        break;
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
