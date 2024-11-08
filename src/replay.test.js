import {SharedArray} from "k6/data";
import exec from "k6/execution";
import {check, sleep} from "k6";
import ws from 'k6/ws';
import http from "k6/http";
import {config} from "./config.js";
/** @typedef {import('./types').ReplayRequest} */

/** @type {Array<ReplayRequest>} */
const replayRequests = new SharedArray("replayRequests", function () {
  const file = open("../load.log").split("\n");

  return file
    .filter((line) => line.trim() !== "")
    .map(JSON.parse)
    .sort((a, b) => a.startTime - b.startTime);
});

export const options = {
  scenarios: {
    contacts: {
      executor: "shared-iterations",
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
};

export default function () {
  const request = replayRequests[exec.scenario.iterationInTest];
  sleepUntil(request.startTime);

  let res;

  if (request.url.startsWith('/subscriptions')) {
    res = ws.connect(`${config.nodeUrl}${request.url}`, function (socket) {});
  } else if (request.method === "GET") {
    res = http.get(`${config.nodeUrl}${request.url}`);
  } else if (request.method === "POST") {
    res = http.post(`${config.nodeUrl}${request.url}`, request.body);
  }

  if (request.url.startsWith('/subscriptions')) {
    check(res, {
      "status is 101": (r) => r && r.status === 101,
    });
    sleep(25);
  } else {
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
  }

}
