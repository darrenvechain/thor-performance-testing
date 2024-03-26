# Thor Performance Testing

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [K6](https://k6.io/docs/getting-started/installation/)

## Running the tests

```bash
yarn install
yarn run bundle
k6 run dist/post-200-events-test.js
```
