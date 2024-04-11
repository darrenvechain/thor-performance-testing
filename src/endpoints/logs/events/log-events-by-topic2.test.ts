import { eventData } from "./data-loader";
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
        "topic2": "${eventData.randomTopic2(seed)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export * from "../../../config";
export default expectAtLeastOneEvent(generateRequestBody);
