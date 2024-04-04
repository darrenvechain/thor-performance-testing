import { config } from "../../../constants";
import { expectAtLeastOneEvent } from "./common";
import { eventData } from "./data-loader";
import { randomHelpers } from "../../../helpers/random-helpers";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "topic0": "${eventData.randomTopic0()}"
      }
    ],
    "order": "${randomHelpers.order()}"
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
