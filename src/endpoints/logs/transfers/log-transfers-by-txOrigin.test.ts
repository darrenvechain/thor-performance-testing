import { config } from "../../../constants";
import { expectAtLeastOneEvent } from "./common";
import { transferData } from "./data-loader";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  const txOrigin = transferData.randomTxOrigin().slice(2);

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "txOrigin": "${txOrigin}"
      }
    ]
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
