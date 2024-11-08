import {randomHelpers} from "../../helpers/random-helpers.js";
import {http} from "../../helpers/http.js";
import {config} from "../../config.js";
import {dataHelpers} from "../../helpers/data-helpers.js";
import {check} from "k6";

export default function () {
    const account = dataHelpers.account(randomHelpers.seed());
    const blockID = dataHelpers.blockId(randomHelpers.seed());
    const res = http.get(`${config.nodeUrl}/accounts/${account}?revision=${blockID}`);

    check(res, {
        [`GET account || status is 200`]: () => res.status === 200,
        [`GET account || not null`]: () => {
            const response = res.json();
            return response.hasCode !== undefined && response.energy !== undefined && response.balance
        },
    });
}
