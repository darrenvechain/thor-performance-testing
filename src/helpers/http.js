/** @typedef {import('../types').ReplayRequest} */
import k6 from "k6/http";
import exec from "k6/execution";
import {config} from "../config.js";

/**
 * Custom http functions, so we can log requests to a log file and replay them later
 */
const get = (url, params) => {
  /** @type {ReplayRequest} */
  const log = {
    startTime: exec.instance.currentTestRunDuration,
    url: `/${url.split("/").slice(3).join("/")}`,
  };

  if (!params) {
    params = {};
  }
  params.timeout = config.timeout;



  const res = k6.get(k6.url`${url}`, params);

  log.endTime = exec.instance.currentTestRunDuration;
  log.status = res.status;
  log.method = "GET";

  console.log(log);

  return res;
};

const post = (url, body, params) => {
  /** @type {ReplayRequest} */
  const log = {
    startTime: exec.instance.currentTestRunDuration,
    url: `/${url.split("/").slice(3).join("/")}`,
    body,
  };

  if (!params) {
    params = {};
  }
  params.timeout = config.timeout;

  const res = k6.post(k6.url`${url}`, body, params);

  log.endTime = exec.instance.currentTestRunDuration;
  log.status = res.status;
  log.method = "POST";

  console.log(log);

  return res;
};

export const http = {
  get,
  post,
};
