const vthoRecipient: string[] = require("../../data/vtho-recipients.json");
const vthoRecipientLength = (vthoRecipient as string[]).length;

export const getRandomVthoRecipient = (): string =>  vthoRecipient[Math.floor(Math.random() * vthoRecipientLength)];


const vetRecipient: string[] = require("../../data/vet-recipients.json");
const vetRecipientLength = (vetRecipient as string[]).length;

export const getRandomVetRecipient = (): string =>  vetRecipient[Math.floor(Math.random() * vetRecipientLength)];