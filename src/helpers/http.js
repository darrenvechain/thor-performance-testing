/** @typedef {import('../types').ReplayRequest} */

import k6 from "k6/http";
import exec from "k6/execution";

const get = (url, params) => {

    /** @type {ReplayRequest} */
    const log = {
        startTime: exec.instance.currentTestRunDuration,
        url,
    }

    const res = k6.get(url, params);

    log.endTime = exec.instance.currentTestRunDuration;
    log.status = res.status
    log.method = 'GET'

    console.log(log)

    return res;
};

const post = (url, body, params) => {
    /** @type {ReplayRequest} */
    const log = {
        startTime: exec.instance.currentTestRunDuration,
        url,
        body,
    }

    const res = k6.post(url, body, params);

    log.endTime = exec.instance.currentTestRunDuration;
    log.status = res.status
    log.method = 'POST'

    console.log(log)

    return res;
}

export const http = {
    get,
    post,
};
