import { AppDataSource } from "../../database/datasource";
import Roles from "../../database/entities/roles";

export default async function rolesGetAll() {
  const rolesRepository = AppDataSource.getRepository(Roles);
  const roles = await rolesRepository.find();

  return roles as Omit<Roles, "users" | "salary">[];
}
