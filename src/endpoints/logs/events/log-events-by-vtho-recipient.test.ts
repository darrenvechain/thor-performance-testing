import { addressData } from "../../../heplers/address-helpers";
import { expectAtLeastOneEvent } from "./common";
import { check } from 'k6';
import http from 'k6/http';
import { config } from '../../../constants';

/**
 * This test will query the logs endpoint for VTHO events with a specific recipient address.
 * The recipient address is randomly chosen from a list from which we expect to have logs.
 */

export let options = config.defaultOptions;

const generateRequestBody = (): string => {
  const vthoRecipient = addressData.randomVthoRecipient().slice(2);

  return `{
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "address": "0x0000000000000000000000000000456E65726779",
        "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "topic1": null,
        "topic2": "0x000000000000000000000000${vthoRecipient}"
      }
    ]
  }`;
};

export default expectAtLeastOneEvent(generateRequestBody)