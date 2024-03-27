import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { config } from '../../../constants';
import { addressData } from '../../../heplers/address-helpers';

export let options: Options = {
  vus: 1,
  duration: '1s'
};

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
}

export default () => {
  const res = http.post(`${config.nodeUrl}/logs/event`, generateRequestBody());
  check(res, {
    'status is 200': () => res.status === 200,
    'has transfer logs': () => {
      if (typeof res.body === "string") {
          const body = JSON.parse(res.body);
          return body.length > 0;
      } else {
          return false;
      }
    },
  });
};
