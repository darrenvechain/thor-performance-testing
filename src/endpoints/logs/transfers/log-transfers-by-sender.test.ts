import { config } from "../../../constants";
import { addressData } from "../../../helpers/address-helpers";
import { expectAtLeastOneEvent } from "./common";

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  const sender = addressData.vetSender().slice(2);

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "sender": "${sender}"
      }
    ]
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody);
