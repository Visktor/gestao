import { AppDataSource } from "../../database/datasource";
import Members from "../../database/entities/members";

export default async function membersGetAll() {
  const membersRepo = AppDataSource.getRepository(Members);
  const getAllResult = await membersRepo.find();

  return getAllResult;
}
