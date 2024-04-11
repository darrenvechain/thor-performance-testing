import { randomHelpers } from "../../helpers/random-helpers";
import http from "k6/http";
import { config } from "../../config";
import { check, sleep } from "k6";

const expectNonNull = (requestPath: (seed: number) => string) => {
  return () => {
    const seed = randomHelpers.seed();
    const res = http.get(`${config.nodeUrl}/transactions/${requestPath(seed)}`);
    check(res, {
      "transactions / receipts || status is 200": () => res.status === 200,
      "transactions / receipts || has a non-null response": () => {
        if (typeof res.body === "string") {
          const body = JSON.parse(res.body);
          return body !== null;
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
    const res = http.get(`${config.nodeUrl}/transactions/${requestPath(seed)}`);
    check(res, {
      "transactions / receipts || status is 200": () => res.status === 200,
    });
    //sleep in seconds
    sleep(0.5);
  };
};

export { expectNonNull, expectStatus200 };
