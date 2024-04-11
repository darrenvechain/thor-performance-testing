import { config } from "../config";
import { randomHelpers } from "./random-helpers";

const mainnet = {
  blockIds: require("../data/mainnet/blocks.json"),
  transactionIds: require("../data/mainnet/transactions.json"),
};

const testnet = {
  blockIds: require("../data/testnet/blocks.json"),
  transactionIds: require("../data/testnet/transactions.json"),
};

const nets = {
  mainnet,
  testnet,
};

const activeNet = nets[config.network];

const blockId = (seed: number): string =>
  randomHelpers.element(activeNet.blockIds, seed);
const transactionId = (seed: number): string =>
  randomHelpers.element(activeNet.transactionIds, seed);

export const dataHelpers = {
  blockId,
  transactionId,
};
