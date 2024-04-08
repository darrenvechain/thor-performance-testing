import { Options } from "k6/options";
import { K6Summary, K6SummaryWithEnv } from "./k6/types";
// @ts-ignore
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const nodeUrl = __ENV.NODE_URL;

if (!nodeUrl) {
  throw new Error("NODE_URL is not set");
}

let network = __ENV.NETWORK as "mainnet" | "testnet" | undefined;

if (!network || (network !== "mainnet" && network !== "testnet")) {
  network = "mainnet";
}

const handleSummary = (summary: K6Summary) => {
  const _summary: K6SummaryWithEnv = {
    ...summary,
    nodeUrl,
  };

  return {
    [`.results/${Date.now()}.json`]: JSON.stringify(_summary), //the default data object
    stdout: textSummary(summary, { enableColors: false }),
  };
};

// export const defaultOptions: Options = {
//   stages: [
//     { duration: "10s", target: 5 }, // simulate ramp-up of traffic from 1 to 5 users.
//     { duration: "10s", target: 5 }, // stay at 5
//     { duration: "10s", target: 10 }, // ramp-up to 10 users
//     { duration: "10s", target: 10 }, // stay at 10 users for short amount of time
//     { duration: "10s", target: 5 }, // ramp-down to 5 users
//     { duration: "10s", target: 0 }, // ramp-down to 0 users
//   ],
// };

// For local testing purposes
// export const defaultOptions: Options = {
//   vus: 1,
//   duration: "2s",
// };

// Constant rate of requests with a fixed number of VUs.
export const defaultOptions: Options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      // Number of iterations to execute each timeUnit period.
      rate: 100,
      timeUnit: "1s",
      duration: "1m",
      preAllocatedVUs: 2,
      maxVUs: 2,
    },
  },
};

export const config = {
  nodeUrl: nodeUrl.endsWith("/") ? nodeUrl.slice(0, -1) : nodeUrl,
  defaultOptions,
  network,
  handleSummary,
};
