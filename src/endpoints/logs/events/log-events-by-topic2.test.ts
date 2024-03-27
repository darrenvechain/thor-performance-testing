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
        "topic2": "${eventData.randomTopic2()}"
      }
    ]
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
