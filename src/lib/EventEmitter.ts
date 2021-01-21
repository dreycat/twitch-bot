export class EventEmitter {
  private readonly events = new Map<string, Set<Callback>>();
  protected readonly eventLimit = 100;

  on(name: string, fn: Callback) {
    const event = this.events.get(name);
    const size = event?.size ?? 0;
    if (size > this.eventLimit) throw new Error('event limit exceeded');
    if (event) {
      event.add(fn);
    } else {
      this.events.set(name, new Set([fn]));
    }
  }

  emit(name: string, ...props: any[]) {
    const event = this.events.get(name);
    if (!event) throw new Error('event name not found');
    for (const fn of event.values()) {
      fn(...props);
    }
  }
}
