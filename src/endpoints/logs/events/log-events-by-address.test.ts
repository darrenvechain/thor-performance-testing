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
        "address": "${eventData.randomAddress()}"
      }
    ],
    "order": "${randomHelpers.order()}"
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
