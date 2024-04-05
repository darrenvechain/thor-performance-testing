import util from "util";
import {exec as execSync} from "child_process";

const exec = util.promisify(execSync);

const tests = [
  "log-events-by-address.test.js",
  "log-events-by-no-criteria-with-range.test.js",
  "log-events-by-no-criteria.test.js",
  "log-events-by-topic0.test.js",
  "log-events-by-topic1.test.js",
  "log-events-by-topic2.test.js",
  "log-events-by-topic3.test.js",
  "log-events-by-vtho-recipient.test.js",
  "log-events-by-vtho-sender.test.js",
  "log-transfers-by-recipient.test.js",
  "log-transfers-by-sender.test.js",
  "log-transfers-by-txOrigin.test.js",
  "log-transfers-no-criteria.test.js",
];

const start = async () => {

  console.log(`Running the following tests:`);
  console.log(`\n - ${tests.join('\n - ')} \n`);

  await exec('rm -rf .results/*.json')

  for (const test of tests) {
    try {
      console.log(
        `=================================================================================`,
      );
      console.log(`Running ${test}....`);

      const { stdout } = await exec(`yarn test ${test}`);

      console.log(stdout + "\n");
    } catch (error) {
      console.error(`Error running ${test}`, error);
    }
  }
};

start();
