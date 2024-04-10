import {readResults, TestResult} from "./heplers/results";
import {getParams} from "./heplers/run-k6-comparison";

const results = readResults();

const tests = new Set(results.map((result) => result.name));

const msToMinsAndSeconds = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);

  return `${minutes}m:${seconds}s`;
}

const average = (arr: number[]) => Math.round(arr.reduce((acc, val) => acc + val, 0) / arr.length * 100) / 100;

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

  console.log(`\n${test}\n`);


  const printSummary = (results: TestResult[], url: string) => {

    console.log(`\n${url}`);
    console.log("Success\tTotal Reqs\tDuration\tAverage\tMin\tMed\tMax\tp(90)\tp(95)");

    // Sort by run time -> then log the table
    results.sort((a, b) => a.time - b.time).forEach((result) => {
      console.log(
        `${result.successRate}\t${result.totalReqs}\t${msToMinsAndSeconds(result.duration)}\t${result.avg}\t${result.min}\t${result.median}\t${result.max}\t${result.p90}\t${result.p95}`
      );
    });

    const totalSuccess = average(results.map(result => parseFloat(result.successRate.replace("%", ""))));
    const totalReqs = average(results.map(result => result.totalReqs));
    const totalDuration = average(results.map(result => result.duration));
    const totalAvg = average(results.map(result => result.avg));
    const totalMin = Math.min(...results.map(result => result.min));
    const totalMed = Math.min(...results.map(result => result.median));
    const totalMax = Math.max(...results.map(result => result.max));
    const totalP90 = average(results.map(result => result.p90));
    const totalP95 = average(results.map(result => result.p95));

    console.log(`${totalSuccess}%\t${totalReqs}\t${msToMinsAndSeconds(totalDuration)}\t${totalAvg}\t${totalMin}\t${totalMed}\t${totalMax}\t${totalP90}\t${totalP95}`);
  };

  printSummary(node1Results, params.node1);
  printSummary(node2Results, params.node2);
});
