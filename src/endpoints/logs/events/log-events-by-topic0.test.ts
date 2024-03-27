import { config } from "../../../constants";
import { expectAtLeastOneEvent } from "./common";
import { eventData } from "./data-loader";

/**
 * This test will query the logs endpoint for events with a specific topic0.
 * The topic0 is randomly chosen from a list from which we expect to have logs.
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
        "topic0": "${eventData.randomTopic0()}"
      }
    ]
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
