import { config } from "../../../config";
import { expectAtLeastOneEvent } from "./common";
import { transferData } from "./data-loader";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (): string => {
  const txOrigin = transferData.randomTxOrigin().slice(2);

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "txOrigin": "${txOrigin}"
      }
    ],
    "order": "${randomHelpers.order()}"
  }`;
};

export let options = config.defaultOptions;
export let handleSummary = config.handleSummary;
export default expectAtLeastOneEvent(generateRequestBody);
