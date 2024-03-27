
const nodeUrl = __ENV.NODE_URL

if (!nodeUrl) {
    throw new Error("NODE_URL is not set")
}

export const config = {
    nodeUrl,
}