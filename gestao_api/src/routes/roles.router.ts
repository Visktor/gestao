import rolesGetAll from "../services/roles/getAll";
import trpc, { authProcedure } from "../trpc";
import {
  zscRolesAutocomplete,
  zscRolesUpsert,
} from "../../../shared/schemas/roles";
import rolesUpsert from "../services/roles/upsert";
import { z } from "zod";
import rolesDelete from "../services/roles/delete";
import rolesAutocomplete from "../services/roles/autocomplete";

const rolesRouter = trpc.router({
  getAll: authProcedure.query(rolesGetAll),
  upsert: authProcedure.input(zscRolesUpsert).mutation(rolesUpsert),
  delete: authProcedure.input(z.string().uuid()).mutation(rolesDelete),
  autocomplete: authProcedure
    .input(zscRolesAutocomplete)
    .query(rolesAutocomplete),
});

export default rolesRouter;
