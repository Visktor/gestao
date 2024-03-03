import { AppDataSource } from "../../database/datasource";
import Users from "../../database/entities/users";

export default async function usersGetOne({ input: id }: { input: string }) {
  const usersEntity = AppDataSource.getRepository(Users);

  const user = await usersEntity.findOne({ where: { user_id: id } });

  return user;
}
