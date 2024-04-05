import fs from "fs";
import path from "path";
import { K6SummaryWithEnv } from "../src/k6/types";

type TableRow = {
  URL: string;
  ["Success"]: string;
  Avg: number;
  Min: number;
  Med: number;
  Max: number;
  ["p(90)"]: number;
  ["p(95)"]: number;
  ["Num Reqs"]: number;
};

const splitByUrl = (summaries: TableRow[]): TableRow[][] => {
  const urls = summaries.map((summary) => summary.URL);

  const distinctUrls = Array.from(new Set(urls));

  return distinctUrls.map((url) =>
    summaries.filter((summary) => summary.URL === url),
  );
};

const to2Decimal = (num: number) => Math.round(num * 100) / 100;

const printResults = () => {
  const resultsDir = path.join(__dirname, "..", ".results");

  const jsonFiles = fs
    .readdirSync(resultsDir)
    .filter((file) => file.endsWith(".json"));

  const summarys: K6SummaryWithEnv[] = jsonFiles
    .map((file) =>
      JSON.parse(fs.readFileSync(path.join(resultsDir, file), "utf-8")),
    )
    .sort((a, b) => a.nodeUrl.localeCompare(b.nodeUrl));

  const rows: TableRow[] = summarys.map((summary) => {
    const reqDurations = summary.metrics.http_req_duration.values;

    let totalChecks = 0;
    let successfulChecks = 0;

    summary.root_group.checks.forEach((check) => {
      totalChecks += check.passes + check.fails;
      successfulChecks += check.passes;
    });

    const successRate = (successfulChecks / totalChecks) * 100;

    return {
      URL: summary.nodeUrl,
      ["Success"]: `${successRate}%`,
      Avg: to2Decimal(reqDurations.avg),
      Min: to2Decimal(reqDurations.min),
      Med: to2Decimal(reqDurations.med),
      Max: to2Decimal(reqDurations.max),
      ["p(90)"]: to2Decimal(reqDurations["p(90)"]),
      ["p(95)"]: to2Decimal(reqDurations["p(95)"]),
      ["Num Reqs"]: summary.metrics.http_reqs.values.count,
    };
  });

  // Save the results to a CSV file
  const csv =
    "URL,Success Rate,Average,Min,Median,Max,p(90),p(95),Total Requests\n" +
    rows.map((row) => Object.values(row).join(",")).join("\n");

  fs.writeFileSync(path.join(__dirname, "..", "results.csv"), csv);

  splitByUrl(rows).map((summaries) => {
    console.log("\n" + summaries[0].URL + "\n");
    console.log("Success\tTotal Reqs\tAverage\tMin\tMed\tMax\tp(90)\tp(95)");
    summaries.forEach((summary) => {
      console.log(
        `${summary["Success"]}\t${summary["Num Reqs"]}\t${summary.Avg}\t${summary.Min}\t${summary.Med}\t${summary.Max}\t${summary["p(90)"]}\t${summary["p(95)"]}`,
      );
    });
  });
};

printResults();
