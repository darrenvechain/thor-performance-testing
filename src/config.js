// @ts-ignore
import {textSummary} from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

/** @typedef {import('k6/options').Options} Options */

const nodeUrl = __ENV.NODE_URL;

if (!nodeUrl) {
    throw new Error("NODE_URL is not set");
}

let network = __ENV.NETWORK;

if (!network || (network !== "mainnet" && network !== "testnet")) {
    network = "mainnet";
}

export const handleSummary = (summary) => {
    summary.nodeUrl = nodeUrl;
    summary.time = Date.now();

    return {
        [`.results/${Date.now()}.json`]: JSON.stringify(summary), //the default data object
        stdout: textSummary(summary, {enableColors: false}),
    };
};

/** @type {Options} */
export const options = {
    scenarios: {
        contacts: {
            executor: 'constant-arrival-rate',
            duration: '1m',
            rate: 100,
            timeUnit: '10s',
            preAllocatedVUs: 250,
        },
    },
};

export const config = {
    nodeUrl: nodeUrl.endsWith("/") ? nodeUrl.slice(0, -1) : nodeUrl,
    network,
};
