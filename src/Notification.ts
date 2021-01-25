import { default as images } from '../static/images/*.png';
import { getRandomItem } from './lib/utils';

const carPictures = (images as unknown) as Record<string, string>;

export class Notification {
  private readonly rootEl;

  constructor(selector: string, private readonly lifetime: number) {
    this.rootEl = document.querySelector(selector) as Element;
  }

  show(username: string) {
    const randomCarSrc = getRandomItem(Object.values(carPictures));
    this.render(username, randomCarSrc);
  }

  private destroy(containerEl: HTMLDivElement) {
    setTimeout(() => {
      const listener = () => {
        containerEl.classList.remove('slide-out');
        containerEl.removeEventListener('animationend', listener);
        containerEl.remove();
      };
      containerEl.addEventListener('animationend', listener);
      containerEl.classList.add('slide-out');
    }, this.lifetime);
  }

  private render(username: string, carSrc: string) {
    const containerEl = document.createElement('div');
    const usernameEl = document.createElement('h1');
    const carEl = document.createElement('img');

    containerEl.className = 'container';
    usernameEl.className = 'username';
    carEl.className = 'car';

    usernameEl.textContent = username;
    carEl.src = carSrc;

    containerEl.append(carEl);
    containerEl.append(usernameEl);
    this.rootEl.append(containerEl);
    this.destroy(containerEl);
  }
}
