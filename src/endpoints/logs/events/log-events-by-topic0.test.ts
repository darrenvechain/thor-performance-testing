import { expectAtLeastOneEvent } from "./common";
import { eventData } from "./data-loader";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (seed: number): string => {
  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "topic0": "${eventData.randomTopic0(seed)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export * from "../../../config";
export default expectAtLeastOneEvent(generateRequestBody);
