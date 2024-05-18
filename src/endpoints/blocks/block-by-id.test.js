import { dataHelpers } from "../../helpers/data-helpers.js";
import { expectNonNull } from "./common.js";
import { randomHelpers } from "../../helpers/random-helpers.js";

const createRequestPath = (seed) =>
  `${dataHelpers.blockId(seed)}?compressed=${randomHelpers.bool(seed)}`;

export * from "../../config.js";

export default expectNonNull(createRequestPath);
