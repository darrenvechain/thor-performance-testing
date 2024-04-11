import { check, sleep } from "k6";
import http from "k6/http";
import { config } from "../../../config";
import { randomHelpers } from "../../../helpers/random-helpers";

const expectAtLeastOneEvent = (
  generateRequestBody: (seed: number) => string,
) => {
  return () => {
    const seed = randomHelpers.seed();
    const res = http.post(
      `${config.nodeUrl}/logs/event`,
      generateRequestBody(seed),
    );
    check(res, {
      "logs-events || status is 200": () => res.status === 200,
      "logs-events || has transfer logs": () => {
        if (typeof res.body === "string") {
          const body = JSON.parse(res.body);
          return body.length > 0;
        } else {
          return false;
        }
      },
    });

    //sleep in seconds
    sleep(0.5);
  };
};

const expectStatus200 = (generateRequestBody: (seed: number) => string) => {
  return () => {
    const seed = randomHelpers.seed();
    const res = http.post(
      `${config.nodeUrl}/logs/event`,
      generateRequestBody(seed),
    );
    check(res, {
      "logs-events || status is 200": () => res.status === 200,
    });

    //sleep in seconds
    sleep(0.5);
  };
};

export { expectAtLeastOneEvent, expectStatus200 };
