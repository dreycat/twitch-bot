import { EventEmitter } from './EventEmitter';

export class SlowEventBus extends EventEmitter {
  private time = 0;

  constructor(private readonly delay: number) {
    super();
  }

  emit(name: string, ...xs: any[]) {
    setTimeout(() => {
      this.time -= this.delay;
      super.emit(name, ...xs);
    }, this.time);
    this.time += this.delay;
  }
}
