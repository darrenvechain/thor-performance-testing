import { check } from "k6";
import http from "k6/http";
import { config } from "../../../constants";

const expectAtLeastOneEvent = (generateRequestBody: () => string) => {
  return () => {
    const res = http.post(
      `${config.nodeUrl}/logs/event`,
      generateRequestBody(),
    );
    check(res, {
      "status is 200": () => res.status === 200,
      "has transfer logs": () => {
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

export const expectStatus200 = (generateRequestBody: () => string) => {
  return () => {
    const res = http.post(
      `${config.nodeUrl}/logs/event`,
      generateRequestBody(),
    );
    check(res, {
      "status is 200": () => res.status === 200,
    });
  };
};

export { expectAtLeastOneEvent };
