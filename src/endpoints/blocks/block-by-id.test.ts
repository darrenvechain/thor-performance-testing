import { dataHelpers } from "../../helpers/data-helpers";
import { expectNonNull } from "./common";
import { randomHelpers } from "../../helpers/random-helpers";

const createRequestPath = (seed: number): string =>
  `${dataHelpers.blockId(seed)}?compressed=${randomHelpers.bool(seed)}`;

export * from "../../config";

export default expectNonNull(createRequestPath);
