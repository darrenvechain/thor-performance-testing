const txOrigins = require('./data/transfers-txOrigins.json');
const senders = require('./data/transfers-senders.json');
const recipients = require('./data/transfers-recipients.json');

const randomTxOrigin = () => txOrigins[Math.floor(Math.random() * txOrigins.length)];
const randomSender = () => senders[Math.floor(Math.random() * senders.length)];
const randomRecipient = () => recipients[Math.floor(Math.random() * recipients.length)];

export const transferData = {
    randomTxOrigin,
    randomSender,
    randomRecipient
}