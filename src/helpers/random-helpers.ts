// generate a between number between X and Y
const between = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

// generate a between block number
const block = (): number => between(0, 18_000_000);

const order = (): "asc" | "desc" => (Math.random() > 0.5 ? "asc" : "desc");

export const randomHelpers = {
  between,
  block,
  order,
};
