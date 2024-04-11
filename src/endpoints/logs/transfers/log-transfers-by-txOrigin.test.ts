import { expectAtLeastOneEvent } from "./common";
import { transferData } from "./data-loader";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (seed: number): string => {
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

export * from "../../../config";
export default expectAtLeastOneEvent(generateRequestBody);
