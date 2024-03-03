import { getAllOpts } from "../../../shared/schemas/users";
import Branches from "../database/entities/branches";
import branchesGetAll from "../services/branches/getAll";
import trpc from "../trpc";
import branchesUpsert from "../services/branches/upsert";
import {
  branchesUpsertInput,
  branchesSelectInput,
} from "../../../shared/schemas/branches";
import branchesSelect from "../services/branches/select";

const procedure = trpc.procedure;
export const branchesGetAllOpts = getAllOpts(new Branches());

const branchesRouter = trpc.router({
  getAll: procedure.input(branchesGetAllOpts).query(branchesGetAll),
  upsert: procedure.input(branchesUpsertInput).mutation(branchesUpsert),
  getSelect: procedure.input(branchesSelectInput).query(branchesSelect),
});

export default branchesRouter;
