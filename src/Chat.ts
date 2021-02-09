import { EventEmitter } from './lib/EventEmitter';
import { parser } from './parser';
import config from './config';

const { channel, username, password, URL } = config.twitch;

export class Chat extends EventEmitter {
  private ws: WebSocket;

  constructor() {
    super();
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(URL);
    this.ws.addEventListener('open', this.openHandler);
    this.ws.addEventListener('message', this.messageHandler);
    this.ws.addEventListener('close', this.closeHandler);
    this.ws.addEventListener('error', this.errorHandler);
  }

  openHandler = () => {
    console.log('Connected');
    this.ws.send(
      'CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership',
    );
    this.ws.send(`PASS ${password}`);
    this.ws.send(`NICK ${username}`);
    this.ws.send(`JOIN #${channel}`);
  };

  messageHandler = (event: MessageEvent) => {
    const data = event.data as string;

    if (!config.isProduction) {
      console.log('>>>', data);
    }

    const msg = parser(data);

    switch (msg.type) {
      case 'PING':
        this.ws.send('PONG');
        break;
      case 'JOIN':
        msg.users.forEach(username => this.emit('JOIN', username, this.ws));
        break;
    }
  };

  closeHandler = () => {
    console.log('Disconnected');
    setTimeout(() => this.connect(), 2000);
  };

  errorHandler = (error: Event) => {
    console.error(error);
    this.ws.close();
  };
}
