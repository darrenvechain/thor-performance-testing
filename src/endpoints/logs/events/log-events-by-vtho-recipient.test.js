import { addressData } from "../../../helpers/address-helpers.js";
import { expectAtLeastOneEvent } from "./common.js";
import { randomHelpers } from "../../../helpers/random-helpers.js";

const generateRequestBody = (seed) => {
  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "address": "0x0000000000000000000000000000456E65726779",
        "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "topic1": null,
        "topic2": "0x000000000000000000000000${addressData.vthoRecipient(seed).slice(2)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export * from "../../../config.js";

export default expectAtLeastOneEvent(generateRequestBody);
