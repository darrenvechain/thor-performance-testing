import { config } from "../../../config.js";
import { randomHelpers } from "../../../helpers/random-helpers.js";
import { SharedArray } from "k6/data";

const loadSharedArray = (name, file) =>
  new SharedArray(name, function () {
    const data = open(`./data/${config.network}/${file}`);
    return JSON.parse(data);
  });

const txOrigins = loadSharedArray("logs-txOrigins", "transfer-txOrigins.json");
const senders = loadSharedArray("logs-senders", "transfer-senders.json");
const recipients = loadSharedArray(
  "logs-recipients",
  "transfer-recipients.json",
);

const randomTxOrigin = (seed) => randomHelpers.element(txOrigins, seed);
const randomSender = (seed) => randomHelpers.element(senders, seed);
const randomRecipient = (seed) => randomHelpers.element(recipients, seed);

export const transferData = {
  randomTxOrigin,
  randomSender,
  randomRecipient,
};
