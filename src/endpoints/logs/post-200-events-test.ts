import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { config } from '../../constants';
import { getRandomVthoRecipient } from '../../heplers/address-helpers';
import { getRandomNumber } from '../../heplers/number-helpers';

export let options: Options = {
  vus: 1,
  duration: '1s'
};

const generateRequestBody = (): string => {

  const address = getRandomVthoRecipient();
  const fromBlock = getRandomNumber(0, 17_000_000);
  const toBlock = fromBlock + 1_000_000;

  return `{
    "range": {
      "unit": "block",
      "from": ${fromBlock},
      "to": ${toBlock}
    },
    "options": {
      "offset": 0,
      "limit": 100
    },
    "criteriaSet": [
      {
        "address": "0x0000000000000000000000000000456E65726779",
        "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "topic1": null,
        "topic2": "0x000000000000000000000000${address}"
      }
    ]
  }`;
}

export default () => {
  const res = http.post(`${config.nodeUrl}/logs/event`, generateRequestBody());
  check(res, {
    'status is 200': () => res.status === 200,
  });
};
