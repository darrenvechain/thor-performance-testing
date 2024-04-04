import { config } from "../../../config";

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

const randomTopic0 = () =>
  activeNet.topic0Values[
    Math.floor(Math.random() * activeNet.topic0Values.length)
  ];
const randomTopic1 = () =>
  activeNet.topic1Values[
    Math.floor(Math.random() * activeNet.topic1Values.length)
  ];
const randomTopic2 = () =>
  activeNet.topic2Values[
    Math.floor(Math.random() * activeNet.topic2Values.length)
  ];
const randomTopic3 = () =>
  activeNet.topic3Values[
    Math.floor(Math.random() * activeNet.topic3Values.length)
  ];
const randomAddress = () =>
  activeNet.contractAddresses[
    Math.floor(Math.random() * activeNet.contractAddresses.length)
  ];

export const eventData = {
  randomTopic0,
  randomTopic1,
  randomTopic2,
  randomTopic3,
  randomAddress,
};
