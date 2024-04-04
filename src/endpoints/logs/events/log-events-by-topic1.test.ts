import { config } from "../../../constants";
import { eventData } from "./data-loader";
import { expectAtLeastOneEvent } from "./common";
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
        "topic1": "${eventData.randomTopic1()}"
      }
    ],
    "order": "${randomHelpers.order()}"
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
