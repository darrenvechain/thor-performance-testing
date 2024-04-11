import { randomHelpers } from "../../helpers/random-helpers";
import http from "k6/http";
import { config } from "../../config";
import { check, sleep } from "k6";

const expectNonNull = (requestPath: (seed: number) => string) => {
  return () => {
    const seed = randomHelpers.seed();
    const res = http.get(`${config.nodeUrl}/blocks/${requestPath(seed)}`);
    check(res, {
      "blocks || status is 200": () => res.status === 200,
      "blocks || has a non-null response": () => {
        if (typeof res.body === "string") {
          if (res.body === "null") {
            return false;
          }

          const block = JSON.parse(res.body);

          return !isNaN(block.number);
        } else {
          return false;
        }
      },
    });
    //sleep in seconds
    sleep(0.5);
  };
};

const expectStatus200 = (requestPath: (seed: number) => string) => {
  return () => {
    const seed = randomHelpers.seed();
    const res = http.get(`${config.nodeUrl}/blocks/${requestPath(seed)}`);
    check(res, {
      "blocks || status is 200": () => res.status === 200,
    });
    //sleep in seconds
    sleep(0.5);
  };
};

export { expectNonNull, expectStatus200 };
