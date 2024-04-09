import {readResults, TestResult} from "./heplers/results";
import {getParams} from "./heplers/run-k6-comparison";

const results = readResults();

const tests = new Set(results.map((result) => result.name));

tests.forEach((test) => {
  const params = getParams(test);

  console.log(
    `=========================================================================================================`,
  );

  const node1Results = results.filter(
    (result) => result.name === test && result.url === params.node1,
  );
  const node2Results = results.filter(
    (result) => result.name === test && result.url === params.node2,
  );

  const printSummary = (results: TestResult[], url: string) => {
    console.log(`\n\t${test} (${url})\n`);

    console.log("Success\tTotal Reqs\tDuration\tAverage\tMin\tMed\tMax\tp(90)\tp(95)");
    results.forEach((result) => {
      console.log(
        `${result.successRate}\t${result.totalReqs}\t${result.duration}\t${result.avg}\t${result.min}\t${result.median}\t${result.max}\t${result.p90}\t${result.p95}`
      );
    });
  };

  printSummary(node1Results, params.node1);
  printSummary(node2Results, params.node2);
});
