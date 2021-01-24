import { EventEmitter } from './lib/EventEmitter';
import { parser } from './parser';
import config from './config';

const { channel, username, password, URL } = config.twitch;

export class Chat extends EventEmitter {
  constructor() {
    super();
    this.connect();
  }

  private connect() {
    const ws = new WebSocket(URL);

    ws.addEventListener('open', () => {
      console.log('Connected');
      ws.send(
        'CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership',
      );
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
          msg.users.forEach(username => this.emit('JOIN', username, ws));
          break;
      }
    });

    ws.addEventListener('close', () => {
      console.log('Disconnected');
      setTimeout(() => this.connect(), 2000);
    });

    ws.addEventListener('error', error => {
      console.error(error);
      ws.close();
    });
  }
}
