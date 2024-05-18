import { config } from "../config.js";
import randomAddresses from "../data/random-addresses.json";
import { randomHelpers } from "./random-helpers.js";
import { SharedArray } from "k6/data";

const loadSharedArray = (name, file) =>
  new SharedArray(name, function () {
    const data = open(`../data/${config.network}/${file}`);
    return JSON.parse(data);
  });

const vetRecipients = loadSharedArray("vetRecipients", "vet-recipients.json");
const vetSenders = loadSharedArray("vetSenders", "vet-senders.json");
const vthoRecipients = loadSharedArray(
  "vthoRecipients",
  "vtho-recipients.json",
);
const vthoSenders = loadSharedArray("vthoSenders", "vtho-senders.json");

const vetRecipient = (seed) => randomHelpers.element(vetRecipients, seed);
const vetSender = (seed) => randomHelpers.element(vetSenders, seed);
const vthoRecipient = (seed) => randomHelpers.element(vthoRecipients, seed);
const vthoSender = (seed) => randomHelpers.element(vthoSenders, seed);
const randomAddress = () => randomHelpers.element(randomAddresses);

export const addressData = {
  vetRecipient,
  vetSender,
  vthoRecipient,
  vthoSender,
  randomAddress,
};
