import { dataHelpers } from "../../helpers/data-helpers.js";
import { expectStatus200 } from "./common.js";

const createRequestPath = (seed) =>
  `${dataHelpers.transactionId(seed)}?head=${dataHelpers.blockId(seed)}`;

export * from "../../config.js";
export default expectStatus200(createRequestPath);
