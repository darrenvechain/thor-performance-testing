import {randomHelpers} from "../../helpers/random-helpers.js";
import {config} from "../../config.js";
import {http} from "../../helpers/http.js";
import {check} from "k6";

const expectNonNull = (requestPath, domain) => {
  return () => {
    if (!domain) {
        domain = "blocks";
    }
    const seed = randomHelpers.seed();
    const res = http.get(`${config.nodeUrl}/blocks/${requestPath(seed)}`);
    check(res, {
      [`${domain} || status is 200`]: () => res.status === 200,
      [`${domain} || not null`]: () => {
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
  };
};

const expectStatus200 = (requestPath, domain) => {
  return () => {
    if (!domain) {
      domain = "blocks";
    }
    const seed = randomHelpers.seed();
    const res = http.get(`${config.nodeUrl}/blocks/${requestPath(seed)}`);
    check(res, {
        [`${domain} || status is 200`]: () => res.status === 200,
    });
  };
};

export { expectNonNull, expectStatus200 };
