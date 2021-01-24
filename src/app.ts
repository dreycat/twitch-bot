import { Chat } from './Chat';
import { SlowEventBus } from './lib/SlowEventBus';
import { Notification } from './Notification';
import config from './config';

const slowBus = new SlowEventBus(config.delay);
const notification = new Notification('#app', config.notificationLifetime);
const chat = new Chat();

slowBus.on('JOIN', username => notification.show(username));
chat.pipe('JOIN', slowBus);
