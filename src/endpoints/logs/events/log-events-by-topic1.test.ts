import { config } from "../../../constants";
import { eventData } from "./data-loader";
import { expectAtLeastOneEvent } from "./common";

/**
 * This test will query the logs endpoint for events with a specific topic0.
 * The topic1 is randomly chosen from a list from which we expect to have logs.
 */

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
    ]
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
