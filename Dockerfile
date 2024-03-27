FROM node:18 as builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN yarn install

# Copy source files and build
COPY .babelrc tsconfig.json webpack.config.js ./
COPY src ./src
COPY data data
RUN yarn webpack

# Lightweight k6 image
FROM 24hoursmedia/k6-xarch

COPY --from=builder /app /app
