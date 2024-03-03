import { z } from "zod";
import { zscUsersUpsert } from "../../../../shared/schemas/users";
import { AppDataSource } from "../../database/datasource";
import Users from "../../database/entities/users";

export default async function usersUpsert({
  input,
}: {
  input: z.infer<typeof zscUsersUpsert>;
}) {
  const users = AppDataSource.getRepository(Users);
  const savedUser = await users.save(input);
  return savedUser;
}
