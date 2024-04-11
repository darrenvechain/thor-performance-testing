import { expectAtLeastOneEvent } from "./common";
import { randomHelpers } from "../../../helpers/random-helpers";

const generateRequestBody = (seed: number): string => {
  return `{
    "range": {
        "from": ${randomHelpers.block(seed)}
    },
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [],
    "order": "${randomHelpers.order(seed)}"
  }`;
};

export * from "../../../config";
export default expectAtLeastOneEvent(generateRequestBody);
