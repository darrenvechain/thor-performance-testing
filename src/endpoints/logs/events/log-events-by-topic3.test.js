import { eventData } from "./data-loader.js";
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
        "topic3": "${eventData.randomTopic3(seed)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export * from "../../../config.js";

export default expectAtLeastOneEvent(generateRequestBody);
