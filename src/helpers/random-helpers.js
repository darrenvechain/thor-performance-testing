import { randomSeed } from "k6";
import exec from "k6/execution";
import crypto from "k6/crypto";

/**
 * Generate a seed based on the current VU and iteration
 * @param index
 * @return {number}
 */
const seed = (index = 0) => {
  const { idInTest, idInInstance, iterationInInstance, iterationInScenario } =
    exec.vu;

  const hash = crypto.sha256(
    `${idInTest}-${idInInstance}-${iterationInInstance}-${iterationInScenario}-${index}`,
    "hex",
  );
  return parseInt(hash.slice(-12), 16);
};

const random = (seed) => {
  if (seed) {
    randomSeed(seed);
  }

  return Math.random();
};

const element = (arr, seed) => arr[Math.floor(random(seed) * arr.length)];

const between = (min, max, seed) =>
  Math.floor(random(seed) * (max - min) + min);

// generate a between block number
const block = (seed) => between(0, 18000000, seed);

const order = (seed) => (random(seed) > 0.5 ? "asc" : "desc");

const bool = (seed) => random(seed) > 0.5;

export const randomHelpers = {
  between,
  block,
  order,
  random,
  element,
  seed,
  bool,
};
