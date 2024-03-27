import topic0Values from "./data/events-topics0.json";
import topic1Values from "./data/events-topics1.json";
import topic2Values from "./data/events-topics2.json";
import topic3Values from "./data/events-topics3.json";
import contractAddresses from "./data/event-addresses.json";

const randomTopic0 = () =>
  topic0Values[Math.floor(Math.random() * topic0Values.length)];
const randomTopic1 = () =>
  topic1Values[Math.floor(Math.random() * topic1Values.length)];
const randomTopic2 = () =>
  topic2Values[Math.floor(Math.random() * topic2Values.length)];
const randomTopic3 = () =>
  topic3Values[Math.floor(Math.random() * topic3Values.length)];
const randomAddress = () =>
  contractAddresses[Math.floor(Math.random() * contractAddresses.length)];

export const eventData = {
  randomTopic0,
  randomTopic1,
  randomTopic2,
  randomTopic3,
  randomAddress,
};
