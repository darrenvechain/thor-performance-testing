import {config} from "../config.js";
import {randomHelpers} from "./random-helpers.js";
import {SharedArray} from "k6/data";

const loadSharedArray = (name, file) =>
  new SharedArray(name, function () {
    const data = open(`../data/${config.network}/${file}`);
    return JSON.parse(data);
  });

const blockIds = loadSharedArray("blockIds", "blocks.json");
const transactionIds = loadSharedArray("transactionIds", "transactions.json");
const contracts = loadSharedArray("contracts", "contracts.json");
const accounts = loadSharedArray("accounts", "vet-recipients.json");

const blockId = (seed) => randomHelpers.element(blockIds, seed);
const transactionId = (seed) => randomHelpers.element(transactionIds, seed);
const contract = (seed) => randomHelpers.element(contracts, seed);
const account = (seed) => randomHelpers.element(accounts, seed);

export const dataHelpers = {
  blockId,
  transactionId,
    contract,
    account
};
