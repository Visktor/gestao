import { AppDataSource } from "../../database/datasource";
import Members from "../../database/entities/members";

export default async function membersDelete({
  input: member_id,
}: {
  input: string;
}) {
  const membersRepo = AppDataSource.getRepository(Members);
  const deleteResult = await membersRepo.softDelete(member_id);

  return deleteResult;
}
