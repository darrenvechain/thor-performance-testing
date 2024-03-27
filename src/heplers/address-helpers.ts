const vetRecipients: string[] = require('../../data/vet-recipients.json');
const vetSenders: string[] = require('../../data/vet-senders.json');
const vthoRecipients: string[] = require('../../data/vtho-recipients.json');
const vthoSenders: string[] = require('../../data/vtho-senders.json');

const randomVetRecipient = () => vetRecipients[Math.floor(Math.random() * vetRecipients.length)];
const randomVetSender = () => vetSenders[Math.floor(Math.random() * vetSenders.length)];
const randomVthoRecipient = () => vthoRecipients[Math.floor(Math.random() * vthoRecipients.length)];
const randomVthoSender = () => vthoSenders[Math.floor(Math.random() * vthoSenders.length)];

export const addressData = {
    randomVetRecipient,
    randomVetSender,
    randomVthoRecipient,
    randomVthoSender
}