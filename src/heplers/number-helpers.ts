// generate a random number between X and Y
const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

// generate a random block number
const randomBlock = (): number => random(0, 18_000_000);

export const numberHelpers = {
  random,
  randomBlock,
};
