import { config } from "../config";
import randomAddresses from "../data/random-addresses.json";
import { randomHelpers } from "./random-helpers";

const mainnet = {
  vetRecipients: require("../data/mainnet/vet-recipients.json"),
  vetSenders: require("../data/mainnet/vet-senders.json"),
  vthoRecipients: require("../data/mainnet/vtho-recipients.json"),
  vthoSenders: require("../data/mainnet/vtho-senders.json"),
};

const testnet = {
  vetRecipients: require("../data/testnet/vet-recipients.json"),
  vetSenders: require("../data/testnet/vet-senders.json"),
  vthoRecipients: require("../data/testnet/vtho-recipients.json"),
  vthoSenders: require("../data/testnet/vtho-senders.json"),
};

const nets = {
  mainnet,
  testnet,
};

const activeNet = nets[config.network];

const vetRecipient = (seed: number) =>
  randomHelpers.element(activeNet.vetRecipients, seed);
const vetSender = (seed: number) =>
  randomHelpers.element(activeNet.vetSenders, seed);
const vthoRecipient = (seed: number) =>
  randomHelpers.element(activeNet.vthoRecipients, seed);
const vthoSender = (seed: number) =>
  randomHelpers.element(activeNet.vthoSenders, seed);
const randomAddress = (seed: number) =>
  randomHelpers.element(randomAddresses, seed);

export const addressData = {
  vetRecipient,
  vetSender,
  vthoRecipient,
  vthoSender,
  randomAddress,
};
