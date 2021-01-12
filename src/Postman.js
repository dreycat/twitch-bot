class Postman {
  #ms = 0;
  #ws;

  constructor(ws) {
    this.#ws = ws;
  }

  send(message) {
    const step = 3000;
    setTimeout(() => {
      this.#ms -= step;
      this.#ws.send(message);
    }, this.#ms);
    this.#ms += step;
  }
}

module.exports = Postman;
