import { z } from "zod";
import usersGetOne from "../services/users/getOne";
import usersGetAll from "../services/users/getAll";
import usersUpsert from "../services/users/upsert";
import trpc, { authProcedure } from "../trpc";
import {
  zscUsersUpsert,
  getAllOpts,
  zscUsersGetOne,
} from "../../../shared/schemas/users";
import Users from "../database/entities/users";
import usersDeleteOne from "../services/users/delete";

export const userGetAllOpts = getAllOpts(new Users());

const usersRouter = trpc.router({
  getOne: authProcedure.input(zscUsersGetOne).query(usersGetOne),
  getAll: authProcedure.query(usersGetAll),
  upsert: authProcedure.input(zscUsersUpsert).mutation(usersUpsert),
  deleteOne: authProcedure.input(z.string().uuid()).mutation(usersDeleteOne),
});

export default usersRouter;
