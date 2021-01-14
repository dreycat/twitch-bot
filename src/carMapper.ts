import cars from './cars';

type Cars = typeof cars[number];

export const сarMapper: Record<string, Cars> = {
  spacegreencat: 'тонированной волге',
};
