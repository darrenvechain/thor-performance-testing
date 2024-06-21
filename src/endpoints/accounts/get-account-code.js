import {randomHelpers} from "../../helpers/random-helpers.js";
import {http} from "../../helpers/http.js";
import {config} from "../../config.js";
import {dataHelpers} from "../../helpers/data-helpers.js";
import {check} from "k6";

export default function () {
    const seed = randomHelpers.seed();
    const account = dataHelpers.contract(seed);
    const res = http.get(`${config.nodeUrl}/accounts/${account}/code`);

    check(res, {
        [`GET account code || status is 200`]: () => res.status === 200,
        [`GET account code || not null`]: () => {
            const response = res.json();
            return response.code !== undefined && response.code.length > 2;
        },
    });
}
