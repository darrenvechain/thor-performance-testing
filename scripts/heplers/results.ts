import fs from "fs";
import path from "path";
import { K6SummaryWithEnv } from "../../src/k6/types";

export type TestResult = {
  name: string;
  url: string;
  successRate: string;
  avg: number;
  min: number;
  median: number;
  max: number;
  p90: number;
  p95: number;
  totalReqs: number;
  time: string;
  duration: number
};

const resultsPath = path.join(__dirname, "..", "..", "results.json");

const readResults = () => {
  if (!fs.existsSync(resultsPath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(resultsPath, "utf-8")) as TestResult[];
};

const createOrAppendResults = (results: TestResult[]) => {
  if (fs.existsSync(resultsPath)) {
    const existingResults = readResults();
    const newResults = [...existingResults, ...results];
    fs.writeFileSync(resultsPath, JSON.stringify(newResults));
  } else {
    fs.writeFileSync(resultsPath, JSON.stringify(results));
  }
};

const to2Decimal = (num: number) => Math.round(num * 100) / 100;

const persistResults = async (testName: string) => {
  const resultsDir = path.join(__dirname, "..", "..", ".results");

  const jsonFiles = fs
    .readdirSync(resultsDir)
    .filter((file) => file.endsWith(".json"));

  const summaries: K6SummaryWithEnv[] = jsonFiles
    .map((file) =>
      JSON.parse(fs.readFileSync(path.join(resultsDir, file), "utf-8")),
    )
    .sort((a, b) => a.nodeUrl.localeCompare(b.nodeUrl));

  const results: TestResult[] = summaries.map((summary) => {
    const reqDurations = summary.metrics.http_req_duration.values;

    let totalChecks = 0;
    let successfulChecks = 0;

    summary.root_group.checks.forEach((check) => {
      totalChecks += check.passes + check.fails;
      successfulChecks += check.passes;
    });

    const successRate = (successfulChecks / totalChecks) * 100;

    const name = testName.split("/dist/")[1];

    return {
      url: summary.nodeUrl,
      successRate: `${successRate}%`,
      avg: to2Decimal(reqDurations.avg),
      min: to2Decimal(reqDurations.min),
      median: to2Decimal(reqDurations.med),
      max: to2Decimal(reqDurations.max),
      p90: to2Decimal(reqDurations["p(90)"]),
      p95: to2Decimal(reqDurations["p(95)"]),
      totalReqs: summary.metrics.http_reqs.values.count,
      name: name,
      time: new Date().toLocaleString(),
      duration: summary.state.testRunDurationMs,
    };
  });

  createOrAppendResults(results);

  fs.readdirSync(resultsDir).forEach((file) => {
    if (file.endsWith(".json")) {
      fs.unlinkSync(path.join(resultsDir, file));
    }
  });
};

export { persistResults, readResults };
