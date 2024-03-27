import { config } from "../../../constants";
import { eventData } from "./data-loader";
import { expectAtLeastOneEvent } from "./common";

export let options = config.defaultOptions;

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
    ]
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
