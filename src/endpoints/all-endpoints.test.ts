import blockByIdTest from "./blocks/block-by-id.test";
import blockByNumber from "./blocks/block-by-number.test";
import txByIdTest from "./transactions/tx-by-id.test";
import txReceiptByIdTest from "./transactions/tx-receipt-by-id.test";
import txReceiptByIdWithHeadTest from "./transactions/tx-receipt-by-id-with-head.test";
import txByIdWithHeadTest from "./transactions/tx-by-id-with-head.test";
import logEventsByAddressTest from "./logs/events/log-events-by-address.test";
import logEventsByTopic0Test from "./logs/events/log-events-by-topic0.test";
import logEventsByTopic1Test from "./logs/events/log-events-by-topic1.test";
import logEventsByTopic2Test from "./logs/events/log-events-by-topic2.test";
import logEventsByTopic3Test from "./logs/events/log-events-by-topic3.test";
import logEventsByNoCriteriaTest from "./logs/events/log-events-by-no-criteria.test";
import logEventsByNoCriteriaWithRangeTest from "./logs/events/log-events-by-no-criteria-with-range.test";
import logEventsByVthoRecipientTest from "./logs/events/log-events-by-vtho-recipient.test";
import logEventsByVthoSenderTest from "./logs/events/log-events-by-vtho-sender.test";
import logTransfersByRecipientTest from "./logs/transfers/log-transfers-by-recipient.test";
import logTransfersBySenderTest from "./logs/transfers/log-transfers-by-sender.test";
import logTransfersByTxOriginTest from "./logs/transfers/log-transfers-by-txOrigin.test";
import logTransfersNoCriteriaTest from "./logs/transfers/log-transfers-no-criteria.test";
import { randomHelpers } from "../helpers/random-helpers";

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

export * from "../config";

export default () => {
  const seed = randomHelpers.seed();
  const test = randomHelpers.element(tests, seed);
  return test();
};
