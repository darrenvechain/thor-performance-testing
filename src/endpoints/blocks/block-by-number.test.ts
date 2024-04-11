import { expectNonNull } from "./common";
import { randomHelpers } from "../../helpers/random-helpers";

const createRequestPath = (seed: number): string =>
  `${randomHelpers.block(seed)}?compressed=${randomHelpers.bool(seed)}`;

// `options` and `handleSummary`
export * from "../../config";
export default expectNonNull(createRequestPath);
