import { EventEmitter } from './EventEmitter';

export class SlowEventBus extends EventEmitter {
  private time = 0;

  constructor(private readonly delay: number) {
    super();
  }

  emit(name: string, ...props: any[]) {
    setTimeout(() => {
      super.emit(name, ...props);
    }, this.time);
    this.time += this.delay;
  }
}