import blockByIdTest from "./blocks/block-by-id.test.js";
import blockByNumber from "./blocks/block-by-number.test.js";
import txByIdTest from "./transactions/tx-by-id.test.js";
import txReceiptByIdTest from "./transactions/tx-receipt-by-id.test.js";
import txReceiptByIdWithHeadTest from "./transactions/tx-receipt-by-id-with-head.test.js";
import txByIdWithHeadTest from "./transactions/tx-by-id-with-head.test.js";
import logEventsByAddressTest from "./logs/events/log-events-by-address.test.js";
import logEventsByTopic0Test from "./logs/events/log-events-by-topic0.test.js";
import logEventsByTopic1Test from "./logs/events/log-events-by-topic1.test.js";
import logEventsByTopic2Test from "./logs/events/log-events-by-topic2.test.js";
import logEventsByTopic3Test from "./logs/events/log-events-by-topic3.test.js";
import logEventsByNoCriteriaTest from "./logs/events/log-events-by-no-criteria.test.js";
import logEventsByNoCriteriaWithRangeTest from "./logs/events/log-events-by-no-criteria-with-range.test.js";
import logEventsByVthoRecipientTest from "./logs/events/log-events-by-vtho-recipient.test.js";
import logEventsByVthoSenderTest from "./logs/events/log-events-by-vtho-sender.test.js";
import logTransfersByRecipientTest from "./logs/transfers/log-transfers-by-recipient.test.js";
import logTransfersBySenderTest from "./logs/transfers/log-transfers-by-sender.test.js";
import logTransfersByTxOriginTest from "./logs/transfers/log-transfers-by-txOrigin.test.js";
import logTransfersNoCriteriaTest from "./logs/transfers/log-transfers-no-criteria.test.js";
import { randomHelpers } from "../helpers/random-helpers.js";

const tests = [
  //blocks
  blockByIdTest,
  blockByNumber,
  //transactions
  txByIdTest,
  txByIdWithHeadTest,
  txReceiptByIdTest,
  txReceiptByIdWithHeadTest,
  //logs/event
  logEventsByAddressTest,
  logEventsByNoCriteriaTest,
  logEventsByNoCriteriaWithRangeTest,
  logEventsByTopic0Test,
  logEventsByTopic1Test,
  logEventsByTopic2Test,
  logEventsByTopic3Test,
  logEventsByVthoRecipientTest,
  logEventsByVthoSenderTest,
  //logs/transfer
  logTransfersByRecipientTest,
  logTransfersBySenderTest,
  logTransfersByTxOriginTest,
  logTransfersNoCriteriaTest,
];

export * from "../config.js";

export default () => {
  const seed = randomHelpers.seed();
  const test = randomHelpers.element(tests, seed);
  return test();
};
