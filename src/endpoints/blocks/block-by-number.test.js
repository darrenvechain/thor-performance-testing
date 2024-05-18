import { expectNonNull } from "./common.js";
import { randomHelpers } from "../../helpers/random-helpers.js";

const createRequestPath = (seed) =>
  `${randomHelpers.block(seed)}?compressed=${randomHelpers.bool(seed)}`;

// `options` and `handleSummary`
export * from "../../config.js";
export default expectNonNull(createRequestPath, "block-by-number");
