import { config } from "../../../config.js";
import { randomHelpers } from "../../../helpers/random-helpers.js";
import { SharedArray } from "k6/data";

const loadSharedArray = (name, file) =>
  new SharedArray(name, function () {
    const data = open(`./data/${config.network}/${file}`);
    return JSON.parse(data);
  });

const topic0Values = loadSharedArray(
  "events-topic0Values",
  "events-topics0.json",
);
const topic1Values = loadSharedArray(
  "events-topic1Values",
  "events-topics1.json",
);
const topic2Values = loadSharedArray(
  "events-topic2Values",
  "events-topics2.json",
);
const topic3Values = loadSharedArray(
  "events-topic3Values",
  "events-topics3.json",
);

const contractAddresses = new SharedArray(
  "events-contractAddresses",
  function () {
    const data = open(`./data/${config.network}/events-addresses.json`);
    return JSON.parse(data);
  },
);

const randomTopic0 = (seed) => randomHelpers.element(topic0Values, seed);
const randomTopic1 = (seed) => randomHelpers.element(topic1Values, seed);
const randomTopic2 = (seed) => randomHelpers.element(topic2Values, seed);
const randomTopic3 = (seed) => randomHelpers.element(topic3Values, seed);
const randomAddress = (seed) => randomHelpers.element(contractAddresses, seed);

export const eventData = {
  randomTopic0,
  randomTopic1,
  randomTopic2,
  randomTopic3,
  randomAddress,
};
