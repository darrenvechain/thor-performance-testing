# POST /logs/event

## Description

This endpoint is for querying smart contract events on vechain.

## Tests

1. By Criteria
    - These tests query by data that we know exists on chain. The `range` is omitted from the request as we don't know
      the block number of the event.
    - The tests asserts than at least one event is returned.
    - Tests include:
        1. `log-events-by-topic0.test.ts`
        2. `log-events-by-topic1.test.ts`
        3. `log-events-by-topic2.test.ts`
        4. `log-events-by-topic3.test.ts`
        5. `log-events-by-address.test.ts`

2. By VTHO Contract
    - VTHO has triggered a lot of events on the chain. Topic 0 should
      be `0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef` for transfer events
    - These tests can vary:
        1. `log-events-by-vtho-recipient.test.ts` - Query by known recipient address.
        2. `log-events-by-vtho-sender.test.ts` - Query by known sender address.

3. All Events
    - These tests query all events on the chain. The `range` + `options` are important here, otherwise requests may
      timeout.
    - Tests include:
        1. `log-events-by-no-criteria.test.ts`
