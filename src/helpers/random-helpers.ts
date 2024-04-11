// generate a between number between X and Y
import {randomSeed} from "k6";
import exec from "k6/execution";
import crypto from "k6/crypto";

const seed = (index = 0) => {
  const {idInTest, iterationInInstance} =
    exec.vu;

  const hash = crypto.sha256(
    `${idInTest}-${iterationInInstance}-${index}`,
    "hex",
  );
  return parseInt(hash.slice(-12), 16);
};

const random = (seed: number): number => {
  if (seed) {
    randomSeed(seed);
  }

  return Math.random();
};

const element = <T>(arr: T[], seed: number): T =>
  arr[Math.floor(random(seed) * arr.length)];

const between = (min: number, max: number, seed: number): number =>
  Math.floor(random(seed) * (max - min) + min);

// generate a between block number
const block = (seed: number): number => between(0, 18_000_000, seed);

const order = (seed: number): "asc" | "desc" =>
  random(seed) > 0.5 ? "asc" : "desc";

const bool = (seed: number): boolean => random(seed) > 0.5;

export const randomHelpers = {
  between,
  block,
  order,
  random,
  element,
  seed,
  bool,
};
