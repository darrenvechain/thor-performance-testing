import getAccountCode from "./accounts/get-account-code.js";
import getAccount from "./accounts/get-account.js";
import blockByIdTest from "./blocks/block-by-id.test.js";
import blockByNumber from "./blocks/block-by-number.test.js";
import txByIdTest from "./transactions/tx-by-id.test.js";
import txReceiptByIdTest from "./transactions/tx-receipt-by-id.test.js";
import txReceiptByIdWithHeadTest from "./transactions/tx-receipt-by-id-with-head.test.js";
import txByIdWithHeadTest from "./transactions/tx-by-id-with-head.test.js";
import { randomHelpers } from "../helpers/random-helpers.js";
import { SharedArray } from "k6/data";
import getAccountHistoric from "./accounts/get-account-historic";
import beat2SubTest from "./subscriptions/beat2-sub.test";

/**
 * Test groups and their weights. Eg. if blocks has a weight of 10, and transactions a weight of 20, then transactions
 * will be selected twice as often as blocks.
 */
const tests = {
    accounts: {
        weight: 25,
        tests: [getAccountCode, getAccount, getAccountHistoric],
    },
    blocks: {
        weight: 40,
        tests: [blockByIdTest, blockByNumber],
    },
    transactions: {
        weight: 25,
        tests: [
            txByIdTest,
            txByIdWithHeadTest,
            txReceiptByIdTest,
            txReceiptByIdWithHeadTest,
        ],
    },
    wesockets: {
        weight: 10,
        tests: [
            beat2SubTest,
        ],
    }
};

const weightedTests = new SharedArray("weightedTests", function () {
    let weightedTests = [];

    for (let testGroup in tests) {
        for (let i = 0; i < tests[testGroup].weight; i++) {
            weightedTests.push(testGroup);
        }
    }

    return weightedTests;
});

function weightedRandomSelection(tests) {
    // Select a random index from the array
    let randomIndex = randomHelpers.element(
        weightedTests,
        randomHelpers.seed(99),
    );

    return tests[randomIndex];
}

export default () => {
    const testGroup = weightedRandomSelection(tests);
    const seed = randomHelpers.seed();
    const test = randomHelpers.element(testGroup.tests, seed);
    return test();
};

export * from "../config.js";
