import { eventData } from "./data-loader";
import { expectAtLeastOneEvent } from "./common";
import { randomHelpers } from "../../../helpers/random-helpers";
import exec from "k6/execution"
import crypto from "k6/crypto"

const generateRequestBody = (seed: number): string => {

  const vu = exec.vu;

  const request = `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "topic1": "${eventData.randomTopic1(seed)}"
      }
    ],
    "order": "${randomHelpers.order(seed)}"
  }`

  console.log(`Request: ${crypto.sha256(request, "hex")} (Vu-ID=${vu.idInTest}, Iteration=${vu.iterationInInstance})`);

  return request;
};

export * from "../../../config";
export default expectAtLeastOneEvent(generateRequestBody);
