import plansGetAll from "../services/plans/getAll";
import trpc from "../trpc";
import { zscPlansUpsert } from '../../../shared/schemas/plans'
import plansUpsert from "../services/plans/upsert";

const plansRouter = trpc.router({
  getAll: trpc.procedure.query(plansGetAll),
  upsert: trpc.procedure.input(zscPlansUpsert).mutation(plansUpsert)
});

export default plansRouter
