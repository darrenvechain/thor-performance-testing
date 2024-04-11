import { randomHelpers } from "../../../helpers/random-helpers";
import { expectStatus200 } from "./common";

const generateRequestBody = (seed: number): string => {
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

export * from "../../../config";
export default expectStatus200(generateRequestBody);
