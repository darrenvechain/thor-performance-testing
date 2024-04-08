import { config } from "../../../config";
import { addressData } from "../../../helpers/address-helpers";
import { expectAtLeastOneEvent } from "./common";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (): string => {
  const seed = randomHelpers.seed();

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "recipient": "${addressData.vetRecipient(seed)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export let options = config.defaultOptions;
export let handleSummary = config.handleSummary;
export default expectAtLeastOneEvent(generateRequestBody);
