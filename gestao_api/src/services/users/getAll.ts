import { z } from "zod";
import { AppDataSource } from "../../database/datasource";
import Users from "../../database/entities/users";
import { userGetAllOpts } from "../../routes/users.router";

type opts = z.infer<typeof userGetAllOpts>;

export default async function usersGetAll({ input }: { input: opts }) {
  const users = AppDataSource.getRepository(Users);

  const user = await users.find({
    select: input?.select,
  });

  return user;
}
