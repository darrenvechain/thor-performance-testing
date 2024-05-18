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
yarn test:load /path/to/file.test.js
```

## Run with Grafana & InfluxDB

```bash
docker compose up -d --wait
yarn test:load --out influxdb=http://localhost:8086/k6 /path/to/file.test.js 
```

- Open the Grafana [Dashboard](http://localhost:3000/d/GlqvWKLVk/k6-load-testing-results?orgId=1&refresh=5s&from=now-5m&to=now)

## Testnet

```bash
docker compose up -d --wait
yarn test:load \
  -e NODE_URL=https://testnet.dev.node.vechain.org \
  -e NETWORK=testnet \
  --out influxdb=http://localhost:8086/k6 \
  /path/to/file.test.js 
```
