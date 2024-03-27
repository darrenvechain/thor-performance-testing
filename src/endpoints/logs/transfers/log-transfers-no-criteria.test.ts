import { config } from "../../../constants";
import { expectAtLeastOneEvent } from "./common";
import { numberHelpers } from "../../../helpers/number-helpers";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  return `{
    "range": {
        "from": ${numberHelpers.randomBlock()}
    },
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": []
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
