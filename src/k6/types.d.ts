export interface K6SummaryWithEnv extends K6Summary {
  nodeUrl: string;
  time: number;
}

export interface K6Summary {
  root_group: RootGroup;
  options: Options;
  state: State;
  metrics: Metrics;
}

export interface Metrics {
  http_req_receiving: HTTPReqs;
  http_req_tls_handshaking: HTTPReqs;
  vus_max: Vus;
  http_req_blocked: HTTPReqs;
  data_sent: DataReceived;
  http_reqs: DataReceived;
  http_req_connecting: HTTPReqs;
  http_req_sending: HTTPReqs;
  http_req_failed: Checks;
  iterations: DataReceived;
  http_req_duration: HTTPReqs;
  "http_req_duration{expected_response:true}": HTTPReqs;
  http_req_waiting: HTTPReqs;
  iteration_duration: HTTPReqs;
  data_received: DataReceived;
  checks: Checks;
  vus: Vus;
}

export interface Checks {
  type: string;
  contains: string;
  values: ChecksValues;
}

export interface ChecksValues {
  passes: number;
  fails: number;
  rate: number;
}

export interface DataReceived {
  type: string;
  contains: string;
  values: DataReceivedValues;
}

export interface DataReceivedValues {
  count: number;
  rate: number;
}

export interface HTTPReqs {
  type: string;
  contains: string;
  values: { [key: string]: number };
}

export interface Vus {
  type: string;
  contains: string;
  values: VusValues;
}

export interface VusValues {
  value: number;
  min: number;
  max: number;
}

export interface Options {
  summaryTrendStats: string[];
  summaryTimeUnit: string;
  noColor: boolean;
}

export interface RootGroup {
  checks: Check[];
  name: string;
  path: string;
  id: string;
  groups: any[];
}

export interface Check {
  name: string;
  path: string;
  id: string;
  passes: number;
  fails: number;
}

export interface State {
  isStdOutTTY: boolean;
  isStdErrTTY: boolean;
  testRunDurationMs: number;
}
