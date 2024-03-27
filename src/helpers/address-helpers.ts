// using require here because these files are large and typescript can't infer the types
const vetRecipients: string[] = require("../data/vet-recipients.json");
const vetSenders: string[] = require("../data/vet-senders.json");
const vthoRecipients: string[] = require("../data/vtho-recipients.json");
const vthoSenders: string[] = require("../data/vtho-senders.json");
const randomAddresses: string[] = require("../data/random-addresses.json");

const vetRecipient = () =>
  vetRecipients[Math.floor(Math.random() * vetRecipients.length)];
const vetSender = () =>
  vetSenders[Math.floor(Math.random() * vetSenders.length)];
const vthoRecipient = () =>
  vthoRecipients[Math.floor(Math.random() * vthoRecipients.length)];
const vthoSender = () =>
  vthoSenders[Math.floor(Math.random() * vthoSenders.length)];

const randomAddress = () =>
  randomAddresses[Math.floor(Math.random() * randomAddresses.length)];

export const addressData = {
  vetRecipient,
  vetSender,
  vthoRecipient,
  vthoSender,
  randomAddress,
};
