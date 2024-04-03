import { config } from "../constants";
const randomAddresses = require("../data/random-addresses.json");

const mainnet = {
  vetRecipients: require("../data/mainnet/vet-recipients.json"),
  vetSenders: require("../data/mainnet/vet-senders.json"),
  vthoRecipients: require("../data/mainnet/vtho-recipients.json"),
  vthoSenders: require("../data/mainnet/vtho-senders.json"),
};

// const testnet = {
//   vetRecipients: require("../data/testnet/vet-recipients.json"),
//   vetSenders: require("../data/testnet/vet-senders.json"),
//   vthoRecipients: require("../data/testnet/vtho-recipients.json"),
//   vthoSenders: require("../data/testnet/vtho-senders.json"),
// };

const nets = {
  mainnet,
  // testnet,
};

const activeNet = nets[config.network];

const vetRecipient = () =>
  activeNet.vetRecipients[
    Math.floor(Math.random() * activeNet.vetRecipients.length)
  ];
const vetSender = () =>
  activeNet.vetSenders[Math.floor(Math.random() * activeNet.vetSenders.length)];
const vthoRecipient = () =>
  activeNet.vthoRecipients[
    Math.floor(Math.random() * activeNet.vthoRecipients.length)
  ];
const vthoSender = () =>
  activeNet.vthoSenders[
    Math.floor(Math.random() * activeNet.vthoSenders.length)
  ];

const randomAddress = () =>
  randomAddresses[Math.floor(Math.random() * randomAddresses.length)];

export const addressData = {
  vetRecipient,
  vetSender,
  vthoRecipient,
  vthoSender,
  randomAddress,
};
