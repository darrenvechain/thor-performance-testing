import { addressData } from "../../../helpers/address-helpers";
import { expectAtLeastOneEvent } from "./common";
import { config } from "../../../config";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (): string => {
  const vthoSender = addressData.vthoSender().slice(2);

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "address": "0x0000000000000000000000000000456E65726779",
        "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "topic1": "0x000000000000000000000000${vthoSender}"
      }
    ],
    "order": "${randomHelpers.order()}"
  }`;
};

export let options = config.defaultOptions;
export let handleSummary = config.handleSummary;

export default expectAtLeastOneEvent(generateRequestBody);
