import { config } from "../../../config";
import { randomHelpers } from "../../../helpers/random-helpers";
import { expectStatus200 } from "./common";

const generateRequestBody = (): string => {
  const seed = randomHelpers.seed();
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

export let options = config.defaultOptions;
export let handleSummary = config.handleSummary;
export default expectStatus200(generateRequestBody);
