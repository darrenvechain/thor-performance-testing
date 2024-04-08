import { config } from "../../../config";
import { randomHelpers } from "../../../helpers/random-helpers";

const mainnet = {
  topic0Values: require("./data/mainnet/events-topics0.json"),
  topic1Values: require("./data/mainnet/events-topics1.json"),
  topic2Values: require("./data/mainnet/events-topics2.json"),
  topic3Values: require("./data/mainnet/events-topics3.json"),
  contractAddresses: require("./data/mainnet/events-addresses.json"),
};

const testnet = {
  topic0Values: require("./data/testnet/events-topics0.json"),
  topic1Values: require("./data/testnet/events-topics1.json"),
  topic2Values: require("./data/testnet/events-topics2.json"),
  topic3Values: require("./data/testnet/events-topics3.json"),
  contractAddresses: require("./data/testnet/events-addresses.json"),
};

const nets = {
  mainnet,
  testnet,
};

const activeNet = nets[config.network];

const randomTopic0 = (seed: number) =>
  randomHelpers.element(activeNet.topic0Values, seed);
const randomTopic1 = (seed: number) =>
  randomHelpers.element(activeNet.topic1Values, seed);
const randomTopic2 = (seed: number) =>
  randomHelpers.element(activeNet.topic2Values, seed);
const randomTopic3 = (seed: number) =>
  randomHelpers.element(activeNet.topic3Values, seed);
const randomAddress = (seed: number) =>
  randomHelpers.element(activeNet.contractAddresses, seed);

export const eventData = {
  randomTopic0,
  randomTopic1,
  randomTopic2,
  randomTopic3,
  randomAddress,
};
