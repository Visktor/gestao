import { z } from "zod";
import { getAllOpts } from "../../../shared/schemas/users";
import Branches from "../database/entities/branches";
import branchesGetAll from "../services/branches/getAll";
import trpc, { authProcedure } from "../trpc";
import branchesUpsert from "../services/branches/upsert";
import {
  branchesUpsertInput,
  branchesSelectInput,
} from "../../../shared/schemas/branches";
import branchesSelect from "../services/branches/select";
import branchesDelete from "../services/branches/delete";

export const branchesGetAllOpts = getAllOpts(new Branches());

const branchesRouter = trpc.router({
  getAll: authProcedure.input(branchesGetAllOpts).query(branchesGetAll),
  upsert: authProcedure.input(branchesUpsertInput).mutation(branchesUpsert),
  getSelect: authProcedure.input(branchesSelectInput).query(branchesSelect),
  delete: authProcedure.input(z.string().uuid()).mutation(branchesDelete),
});

export default branchesRouter;
