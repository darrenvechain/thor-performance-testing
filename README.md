# Thor Performance Testing

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [K6](https://k6.io/docs/getting-started/installation/)
- [Docker](https://docs.docker.com/get-docker/)

## Run locally

```bash
yarn install
yarn bundle
source .env
k6 run dist/log-events-by-vtho-recipient.test.js
```

- For a full list of tests, please refer to the `./dist` directory after running `yarn bundle`)

## Run with Docker, Grafana and InfluxDB

```bash
docker compose up -d --wait influxdb grafana
docker compose up --build k6-app
```

- You can change the `command` on the `k6-app` service in the `docker-compose.yml` file to run a different test

Open the Grafana [Dashboard](http://localhost:3000/d/GlqvWKLVk/k6-load-testing-results?orgId=1&refresh=5s&from=now-5m&to=now)
