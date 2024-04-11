import { dataHelpers } from "../../helpers/data-helpers";
import { expectNonNull } from "./common";

const createRequestPath = (seed: number): string =>
  `${dataHelpers.transactionId(seed)}/receipt`;

export * from "../../config";
export default expectNonNull(createRequestPath);
