import { expectAtLeastOneEvent } from "./common.js";
import { randomHelpers } from "../../../helpers/random-helpers.js";

const generateRequestBody = (seed) => {
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

export * from "../../../config.js";
export default expectAtLeastOneEvent(generateRequestBody);
