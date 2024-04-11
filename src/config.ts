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

export const handleSummary = (summary: K6Summary) => {
  const _summary: K6SummaryWithEnv = {
    ...summary,
    nodeUrl,
    time: Date.now(),
  };

  return {
    [`.results/${Date.now()}.json`]: JSON.stringify(_summary), //the default data object
    stdout: textSummary(summary, { enableColors: false }),
  };
};

// For local testing purposes
// export const defaultOptions: Options = {
//   vus: 1,
//   duration: "2s",
// };

// Constant rate of requests with a fixed number of VUs.
export const options: Options = {
  scenarios: {
    constant_request_rate: {
      executor: "per-vu-iterations",
      // 50 * 500 = 25,000
      vus: 50,
      iterations: 500,
      maxDuration: "1h",
    },
  },
};

export const config = {
  nodeUrl: nodeUrl.endsWith("/") ? nodeUrl.slice(0, -1) : nodeUrl,
  network,
};
