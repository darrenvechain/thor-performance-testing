import { config } from "../../../constants";
import { addressData } from "../../../helpers/address-helpers";
import { expectAtLeastOneEvent } from "./common";
import { randomHelpers } from "../../../helpers/random-helpers";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  const recipient = addressData.vetRecipient().slice(2);

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "recipient": "${recipient}"
      }
    ],
    "order": "${randomHelpers.order()}"
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
