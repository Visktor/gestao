import { AppDataSource } from "../../database/datasource";
import Users from "../../database/entities/users";
import { Unpacked } from "../../@types/utils";

export default async function usersGetAll() {
  const users = AppDataSource.getRepository(Users);

  const user = await users.find({
    loadEagerRelations: false,
  });

  return user as Omit<Unpacked<typeof user>, "reports" | "classes" | "branch" | "role" | "password">[];
}
