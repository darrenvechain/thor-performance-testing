import {SharedArray} from "k6/data";
import exec from "k6/execution";
import {check, sleep} from "k6";
import http from "k6/http";
/** @typedef {import('./types').ReplayRequest} */

/** @type {Array<ReplayRequest>} */
const replayRequests = new SharedArray("replayRequests", function() {
    const file = open("../load.log").split("\n");

    return file
        .filter(line => line.trim() !== "")
        .map(JSON.parse)
        .sort((a, b) => a.startTime - b.startTime);
});

export const options = {
    scenarios: {
        contacts: {
            executor: 'shared-iterations',
            vus: replayRequests.length < 10000 ? replayRequests.length : 10000,
            iterations: replayRequests.length,
        },
    },
};

const testStartTime = Date.now();

const sleepUntil = (requestStartTime) => {
    const currentTimeSeconds = (Date.now() - testStartTime) / 1000;
    const requestStartTimeSeconds = requestStartTime / 1000;

    if (requestStartTimeSeconds > currentTimeSeconds) {
       sleep(requestStartTimeSeconds - currentTimeSeconds);
    }
}

export default function () {
    const request = replayRequests[exec.scenario.iterationInTest];
    sleepUntil(request.startTime);

    let res;

    if (request.method === "GET") {
        res = http.get(request.url);
    } else if (request.method === "POST") {
        res = http.post(request.url, request.body);
    }

    check(res, {
        "status is 200": (r) => r.status === 200
    });
}


