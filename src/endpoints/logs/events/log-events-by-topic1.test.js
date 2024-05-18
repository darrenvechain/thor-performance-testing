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
        "topic1": "${eventData.randomTopic1(seed)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export * from "../../../config.js";
export default expectAtLeastOneEvent(generateRequestBody);
