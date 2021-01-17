export default class Postman {
  private ms = 0;

  send(message: string) {
    const step = 3000;
    setTimeout(() => {
      this.ms -= step;
      console.log(message);
    }, this.ms);
    this.ms += step;
  }
}
