import usersGetOne from "../services/users/getOne";
import usersGetAll from "../services/users/getAll";
import usersUpsert from "../services/users/upsert";
import trpc from "../trpc";
import {
  zscUsersUpsert,
  getAllOpts,
  zscUsersGetOne,
} from "../../../shared/schemas/users";
import Users from "../database/entities/users";

const procedure = trpc.procedure;
export const userGetAllOpts = getAllOpts(new Users());

const usersRouter = trpc.router({
  getOne: procedure.input(zscUsersGetOne).query(usersGetOne),
  getAll: procedure.query(usersGetAll),
  upsert: procedure.input(zscUsersUpsert).mutation(usersUpsert),
});

export default usersRouter;
