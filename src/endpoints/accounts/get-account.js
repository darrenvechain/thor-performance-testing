import {randomHelpers} from "../../helpers/random-helpers.js";
import {http} from "../../helpers/http.js";
import {config} from "../../config.js";
import {dataHelpers} from "../../helpers/data-helpers.js";
import {check} from "k6";

export default function () {
    const seed = randomHelpers.seed();
    const account = dataHelpers.account(seed);
    const res = http.get(`${config.nodeUrl}/accounts/${account}`);

    check(res, {
        [`GET account || status is 200`]: () => res.status === 200,
        [`GET account || not null`]: () => {
            const response = res.json();
            return response.hasCode !== undefined && response.energy !== undefined && response.balance
        },
    });
}
