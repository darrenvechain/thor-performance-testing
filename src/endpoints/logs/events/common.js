import { check } from "k6";
import { config } from "../../../config.js";
import { randomHelpers } from "../../../helpers/random-helpers.js";
import { http } from "../../../helpers/http.js";

const expectAtLeastOneEvent = (generateRequestBody, domain) => {
  return () => {
    if (!domain) {
      domain = "logs-events";
    }
    const seed = randomHelpers.seed();
    const res = http.post(
      `${config.nodeUrl}/logs/event`,
      generateRequestBody(seed),
    );
    check(res, {
      [`${domain} || status is 200`]: () => res.status === 200,
      [`${domain} || has transfer logs`]: () => {
        if (typeof res.body === "string") {
          const body = JSON.parse(res.body);
          return body.length > 0;
        } else {
          return false;
        }
      },
    });
  };
};

const expectStatus200 = (generateRequestBody, domain) => {
  return () => {
    if (!domain) {
      domain = "logs-events";
    }
    const seed = randomHelpers.seed();
    const res = http.post(
      `${config.nodeUrl}/logs/event`,
      generateRequestBody(seed),
    );
    check(res, {
      [`${domain} || status is 200`]: () => res.status === 200,
    });
  };
};

export { expectAtLeastOneEvent, expectStatus200 };
