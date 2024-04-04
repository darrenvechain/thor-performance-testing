import { config } from "../../../config";
import { eventData } from "./data-loader";
import { expectAtLeastOneEvent } from "./common";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (): string => {
  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "topic3": "${eventData.randomTopic3()}"
      }
    ],
    "order": "${randomHelpers.order()}"
  }`;
};

export let options = config.defaultOptions;
export let handleSummary = config.handleSummary;

export default expectAtLeastOneEvent(generateRequestBody);
