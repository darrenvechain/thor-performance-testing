import { randomHelpers } from "../../../helpers/random-helpers.js";
import { expectStatus200 } from "./common.js";

const generateRequestBody = (seed) => {
  const from = randomHelpers.block(seed);
  const to = from + 100;

  return `{
    "range": {
        "from": ${from},
        "to": ${to}
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
export default expectStatus200(generateRequestBody);
