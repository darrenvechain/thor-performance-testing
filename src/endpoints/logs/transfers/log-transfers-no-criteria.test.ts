import { config } from "../../../constants";
import { expectAtLeastOneEvent } from "./common";
import { randomHelpers } from "../../../helpers/random-helpers";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  return `{
    "range": {
        "from": ${randomHelpers.block()}
    },
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [],
    "order": "${randomHelpers.order()}"
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
