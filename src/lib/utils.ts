const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomItem = <T>(items: readonly T[]): T => {
  return items[getRandomIntInclusive(0, items.length - 1)];
};
