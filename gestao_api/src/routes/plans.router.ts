import plansGetAll from "../services/plans/getAll";
import trpc, { authProcedure } from "../trpc";
import { zscPlansSelect, zscPlansUpsert } from "../../../shared/schemas/plans";
import plansUpsert from "../services/plans/upsert";
import { z } from "zod";
import plansDeleteOne from "../services/plans/deleteOne";
import plansGetSelect from "../services/plans/getSelect";

const plansRouter = trpc.router({
  getAll: authProcedure.query(plansGetAll),
  upsert: authProcedure.input(zscPlansUpsert).mutation(plansUpsert),
  delete: authProcedure.input(z.string().uuid()).mutation(plansDeleteOne),
  getSelect: authProcedure.input(zscPlansSelect).query(plansGetSelect),
});

export default plansRouter;
