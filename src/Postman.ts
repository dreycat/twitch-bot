import type WebSocket from 'ws';

export default class Postman {
  #ms = 0;
  #ws;

  constructor(ws: WebSocket) {
    this.#ws = ws;
  }

  send(message: string) {
    const step = 3000;
    setTimeout(() => {
      this.#ms -= step;
      this.#ws.send(message);
    }, this.#ms);
    this.#ms += step;
  }
}
