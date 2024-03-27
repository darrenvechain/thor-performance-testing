import { Options } from "k6/options";

const nodeUrl = __ENV.NODE_URL;

if (!nodeUrl) {
  throw new Error("NODE_URL is not set");
}

// export const defaultOptions: Options = {
//   stages: [
//     { duration: "20s", target: 20 }, // simulate ramp-up of traffic from 1 to 20 users over 20 seconds.
//     { duration: "20s", target: 20 }, // stay at 20 users for 20 seconds
//     { duration: "20s", target: 40 }, // ramp-up to 40 users over 20 seconds
//     { duration: "20s", target: 40 }, // stay at 40 users for 20 seconds
//     { duration: "20s", target: 20 }, // ramp-down to 20 users over 20 seconds
//     { duration: "20s", target: 0 }, // ramp-down to 0 users
//   ],
// };

export const defaultOptions: Options = {
  vus: 1,
  duration: "1s",
};

export const config = {
  nodeUrl,
  defaultOptions,
};
