import membersDelete from "../services/members/delete";
import membersGetAll from "../services/members/getAll";
import trpc, { authProcedure } from "../trpc";
import { z } from "zod";
import { zscMembersUpsert } from "../../../shared/schemas/members";
import membersUpsert from "../services/members/upsert";

const memberRouter = trpc.router({
  getAll: authProcedure.query(membersGetAll),
  delete: authProcedure.input(z.string().uuid()).mutation(membersDelete),
  upsert: authProcedure.input(zscMembersUpsert).mutation(membersUpsert),
});

export default memberRouter;
