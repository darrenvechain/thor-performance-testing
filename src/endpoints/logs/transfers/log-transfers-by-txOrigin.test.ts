import { config } from "../../../config";
import { expectAtLeastOneEvent } from "./common";
import { transferData } from "./data-loader";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (): string => {
  const seed = randomHelpers.seed();

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "txOrigin": "${transferData.randomTxOrigin(seed)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export let options = config.defaultOptions;
export let handleSummary = config.handleSummary;
export default expectAtLeastOneEvent(generateRequestBody);
