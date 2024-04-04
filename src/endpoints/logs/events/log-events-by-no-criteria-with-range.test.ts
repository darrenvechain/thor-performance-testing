import { config } from "../../../constants";
import { randomHelpers } from "../../../helpers/random-helpers";
import { expectStatus200 } from "./common";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  const from = randomHelpers.block();
  const to = from + 100;

  return `{
    "range": {
        "from": ${randomHelpers.block()},
        "to": ${to}
    },
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [],
    "order": "${randomHelpers.order()}"
  }`;
};

export default expectStatus200(generateRequestBody);
