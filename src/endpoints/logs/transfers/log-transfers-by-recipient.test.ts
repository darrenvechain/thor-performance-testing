import { check } from "k6";
import http from "k6/http";
import { config } from "../../../constants";
import { addressData } from "../../../heplers/address-helpers";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  const recipient = addressData.randomVetRecipient().slice(2);

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "recipient": "${recipient}"
      }
    ]
  }`;
};

export default () => {
  const res = http.post(
    `${config.nodeUrl}/logs/transfer`,
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
