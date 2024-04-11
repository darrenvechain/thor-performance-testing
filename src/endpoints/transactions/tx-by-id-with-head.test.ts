import { dataHelpers } from "../../helpers/data-helpers";
import { expectStatus200 } from "./common";

const createRequestPath = (seed: number): string =>
  `${dataHelpers.transactionId(seed)}?head=${dataHelpers.blockId(seed)}`;

export * from "../../config";
export default expectStatus200(createRequestPath);
