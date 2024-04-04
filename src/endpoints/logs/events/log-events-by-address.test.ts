import { config } from "../../../config";
import { expectAtLeastOneEvent } from "./common";
import { eventData } from "./data-loader";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (): string => {
  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "address": "${eventData.randomAddress()}"
      }
    ],
    "order": "${randomHelpers.order()}"
  }`;
};

export let options = config.defaultOptions;
export let handleSummary = config.handleSummary;
export default expectAtLeastOneEvent(generateRequestBody);
