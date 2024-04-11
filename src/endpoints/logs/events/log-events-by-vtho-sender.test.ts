import { addressData } from "../../../helpers/address-helpers";
import { expectAtLeastOneEvent } from "./common";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (seed: number): string => {
  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "address": "0x0000000000000000000000000000456E65726779",
        "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "topic1": "0x000000000000000000000000${addressData.vthoSender(seed).slice(2)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export * from "../../../config";

export default expectAtLeastOneEvent(generateRequestBody);
