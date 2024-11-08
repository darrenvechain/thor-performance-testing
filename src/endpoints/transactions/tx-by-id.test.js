import { dataHelpers } from "../../helpers/data-helpers.js";
import { expectNonNull } from "./common.js";

const createRequestPath = (seed) => dataHelpers.transactionId(seed);

export * from "../../config.js";
export default expectNonNull(createRequestPath, "tx-by-id");
