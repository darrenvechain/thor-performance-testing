import { config } from "../../../constants";
import { expectAtLeastOneEvent } from "./common";
import { eventData } from "./data-loader";

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
    ]
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
