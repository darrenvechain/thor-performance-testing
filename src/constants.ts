import { Options } from "k6/options";

const nodeUrl = __ENV.NODE_URL;

if (!nodeUrl) {
  throw new Error("NODE_URL is not set");
}

let network = __ENV.NETWORK as "mainnet" | "testnet" | undefined;

if (!network || (network !== "mainnet" && network !== "testnet")) {
  network = "mainnet";
}

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

export const defaultOptions: Options = {
  vus: 1,
  duration: "2s",
};

export const config = {
  nodeUrl: nodeUrl.endsWith("/") ? nodeUrl.slice(0, -1) : nodeUrl,
  defaultOptions,
  network,
};
