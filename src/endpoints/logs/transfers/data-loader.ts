// import txOrigins from "./data/transfers-txOrigins.json";
// import senders from "./data/transfers-senders.json";
// import recipients from "./data/transfers-recipients.json";

import { config } from "../../../constants";

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

const randomTxOrigin = () =>
  activeNet.txOrigins[Math.floor(Math.random() * activeNet.txOrigins.length)];
const randomSender = () =>
  activeNet.senders[Math.floor(Math.random() * activeNet.senders.length)];
const randomRecipient = () =>
  activeNet.recipients[Math.floor(Math.random() * activeNet.recipients.length)];

export const transferData = {
  randomTxOrigin,
  randomSender,
  randomRecipient,
};
