import { config } from "../../../config";
import { randomHelpers } from "../../../helpers/random-helpers";

const mainnet = {
  txOrigins: require("./data/mainnet/transfer-txOrigins.json"),
  senders: require("./data/mainnet/transfer-senders.json"),
  recipients: require("./data/mainnet/transfer-recipients.json"),
};

const testnet = {
  txOrigins: require("./data/testnet/transfer-txOrigins.json"),
  senders: require("./data/testnet/transfer-senders.json"),
  recipients: require("./data/testnet/transfer-recipients.json"),
};

const nets = {
  mainnet,
  testnet,
};

const activeNet = nets[config.network];

const randomTxOrigin = (seed: number) =>
  randomHelpers.element(activeNet.txOrigins, seed);

const randomSender = (seed: number) =>
  randomHelpers.element(activeNet.senders, seed);
const randomRecipient = (seed: number) =>
  randomHelpers.element(activeNet.recipients, seed);

export const transferData = {
  randomTxOrigin,
  randomSender,
  randomRecipient,
};
