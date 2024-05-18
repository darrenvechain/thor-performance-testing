import { randomHelpers } from "../../helpers/random-helpers.js";
import { config } from "../../config.js";
import { check } from "k6";
import { http } from "../../helpers/http.js";

const expectNonNull = (requestPath) => {
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
  };
};

const expectStatus200 = (requestPath) => {
  return () => {
    const seed = randomHelpers.seed();
    const res = http.get(`${config.nodeUrl}/transactions/${requestPath(seed)}`);
    check(res, {
      "transactions / receipts || status is 200": () => res.status === 200,
    });
  };
};

export { expectNonNull, expectStatus200 };
