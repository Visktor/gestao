import rolesGetAll from "../services/roles/getAll";
import trpc from "../trpc";
import { zscRolesUpsert } from "../../../shared/schemas/roles";
import rolesUpsert from "../services/roles/upsert";
import { z } from "zod";
import rolesDelete from "../services/roles/delete";

const rolesRouter = trpc.router({
  getAll: trpc.procedure.query(rolesGetAll),
  upsert: trpc.procedure.input(zscRolesUpsert).mutation(rolesUpsert),
  delete: trpc.procedure.input(z.string().uuid()).mutation(rolesDelete),
});

export default rolesRouter;
