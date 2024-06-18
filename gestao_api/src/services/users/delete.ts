import { AppDataSource } from "../../database/datasource";
import Users from "../../database/entities/users";

export default function usersDeleteOne({ input }: { input: string }) {
  const usersRepo = AppDataSource.getRepository(Users);
  const result = usersRepo.softDelete(input);

  return result;
}
