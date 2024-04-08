# Thor Performance Testing

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [K6](https://k6.io/docs/getting-started/installation/)
- [Docker](https://docs.docker.com/get-docker/)

## Run locally

### Option 1: Run a single performance test

```bash
yarn install
yarn bundle
k6 run \
    -e NODE_URL=https://mainnet.dev.node.vechain.org \
    dist/log-events-by-topic0.test.js
```

### Option 2: Run against 2 nodes sequentially

- Please refer to [`.env`](./.env) for the configuration options and [`./scripts/run-comparisons.ts`](./scripts/run-comparisons.ts) for the test scenarios.
- Then run:

```bash
yarn install
yarn bundle
yarn test
```

## Run with Grafana & InfluxDB

```bash
docker compose up -d --wait
k6 run \
    -e NODE_URL=https://mainnet.dev.node.vechain.org \
    --out influxdb=http://localhost:8086/k6 \
    dist/log-events-by-topic0.test.js
```

- Open the
  Grafana [Dashboard](http://localhost:3000/d/GlqvWKLVk/k6-load-testing-results?orgId=1&refresh=5s&from=now-5m&to=now)

## Testnet

```bash
docker compose up -d --wait
k6 run \
    -e NODE_URL=https://testnet.dev.node.vechain.org \
    -e NETWORK=testnet \
    --out influxdb=http://localhost:8086/k6 \
    dist/log-events-by-topic0.test.js
```
