import { config } from "../../../constants";
import { numberHelpers } from "../../../helpers/number-helpers";
import { expectStatus200 } from "./common";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  const from = numberHelpers.randomBlock();
  const to = from + 100;

  return `{
    "range": {
        "from": ${numberHelpers.randomBlock()},
        "to": ${to}
    },
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": []
  }`;
};

export default expectStatus200(generateRequestBody);
