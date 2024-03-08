import { AppDataSource } from "../../database/datasource";
import Roles from "../../database/entities/roles";

export default async function rolesDelete({ input }: { input: string }) {
  const rolesRepository = AppDataSource.getRepository(Roles);
  const deleteResult = await rolesRepository.softDelete({ role_id: input });
  return deleteResult;
}
