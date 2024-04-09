import * as paths from "path";
import fs from "fs";
import { config } from "dotenv";
import { executeCommand } from "./execute-command";
import { persistResults } from "./results";

config();

export const getParams = (testName: string) => {
  const node1 = process.env.NODE_1_URL;
  const node2 = process.env.NODE_2_URL;
  const iterations = process.env.ITERATIONS;
  let network = process.env.NETWORK;

  if (!node1 || !node2) {
    console.error("\n\n\tBoth NODE_1_URL and NODE_2_URL are required");
    process.exit(1);
  }

  if (!testName) {
    console.error(
      "\n\n\tthe name of the k6 script is required as the first argument",
    );
    process.exit(1);
  }

  const scriptPath = paths.join(__dirname, "..", "..", "dist", testName);

  if (!fs.existsSync(scriptPath)) {
    console.error(`\n\n\tScript does not exist @ ${scriptPath}`);
    process.exit(1);
  }

  try {
    new URL(node1);
  } catch (e) {
    console.error("\n\n\tInvalid URL for --node1");
    process.exit(1);
  }

  try {
    new URL(node2);
  } catch (e) {
    console.error("\n\n\tInvalid URL for --node2");
    process.exit(1);
  }

  if (!network) {
    network = "mainnet";
  }

  if (network !== "mainnet" && network !== "testnet") {
    console.error("\n\n\tInvalid value for NETWORK");
    process.exit(1);
  }

  const amountValue = iterations ? parseInt(iterations) : 3;

  if (isNaN(amountValue)) {
    console.error("\n\n\tInvalid value for --iterations");
    process.exit(1);
  }

  return {
    node1,
    node2,
    network,
    script: scriptPath,
    amount: amountValue,
  };
};

export const runK6Comparison = async (testName: string) => {
  const params = getParams(testName);

  console.log("\nRunning K6 comparisons with the following parameters:");
  console.log(`\n\tNode 1: ${params.node1}`);
  console.log(`\tNode 2: ${params.node2}`);
  console.log(`\tNetwork: ${params.network}`);
  console.log(`\tScript: ${params.script}`);
  console.log(`\tIterations: ${params.amount}`);
  console.log(`\tTime: ${new Date().toLocaleTimeString()}`)

  for (let i = 0; i < params.amount; i++) {

    const startTime = Date.now();

    const command1 = `k6 run --env NODE_URL=${params.node1} --env NETWORK=${params.network} ${params.script}`;
    console.log(`\n\tRunning k6 (iteration=${i + 1}) on node 1...`);
    console.log(`\tTime: ${new Date().toLocaleTimeString()}`)
    await executeCommand(command1);

    const command2 = `k6 run --env NODE_URL=${params.node2} --env NETWORK=${params.network} ${params.script}`;
    console.log(`\tRunning k6 (iteration=${i + 1}) on node 2...`);
    console.log(`\tTime: ${new Date().toLocaleTimeString()}`)
    await executeCommand(command2);

    const endTime = Date.now();

    //ensure that the time between iterations is at least 5 minutes
    const diff = endTime - startTime;
    const waitTime = 300_000 - diff;
    console.log(`\n\tWaiting for ${waitTime / 1000} seconds before next iteration...`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  await persistResults(params.script);
};
