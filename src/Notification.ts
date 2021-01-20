import { default as images } from '../static/images/*.png';
import { getRandomItem } from './lib/utils';

const carPictures = (images as unknown) as Record<string, string>;

export class Notification {
  private readonly root;

  constructor(selector: string, private readonly lifetime: number) {
    this.root = document.querySelector(selector) as Element;
    this.show = this.show.bind(this);
  }

  show(username: string) {
    const randomCarSrc = getRandomItem(Object.values(carPictures));
    this.render(username, randomCarSrc);
    this.destroy();
  }

  private destroy() {
    setTimeout(() => {
      this.root.innerHTML = '';
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

    containerEl.appendChild(carEl);
    containerEl.appendChild(usernameEl);
    this.root.appendChild(containerEl);
  }
}
