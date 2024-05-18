import {randomHelpers} from "../../helpers/random-helpers.js";
import {config} from "../../config.js";
import {check} from "k6";
import {http} from "../../helpers/http.js";

const expectNonNull = (requestPath, domain) => {
  return () => {
    if (!domain) {
      domain = "transactions";
    }
    const seed = randomHelpers.seed();
    const res = http.get(`${config.nodeUrl}/transactions/${requestPath(seed)}`);
    check(res, {
      [`${domain} || status is 200`]: () => res.status === 200,
      [`${domain} || has a non-null response`]: () => {
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

const expectStatus200 = (requestPath, domain) => {
  return () => {
    if (!domain) {
      domain = "transactions";
    }
    const seed = randomHelpers.seed();
    const res = http.get(`${config.nodeUrl}/transactions/${requestPath(seed)}`);
    check(res, {
      [`${domain} || status is 200`]: () => res.status === 200,
    });
  };
};

export { expectNonNull, expectStatus200 };
