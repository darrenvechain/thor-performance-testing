import txOrigins from "./data/transfers-txOrigins.json";
import senders from "./data/transfers-senders.json";
import recipients from "./data/transfers-recipients.json";

const randomTxOrigin = () =>
  txOrigins[Math.floor(Math.random() * txOrigins.length)];
const randomSender = () => senders[Math.floor(Math.random() * senders.length)];
const randomRecipient = () =>
  recipients[Math.floor(Math.random() * recipients.length)];

export const transferData = {
  randomTxOrigin,
  randomSender,
  randomRecipient,
};
