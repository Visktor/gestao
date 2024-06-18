import { AppDataSource } from "../../database/datasource";
import Roles from "../../database/entities/roles";

export default async function rolesGetAll() {
  const rolesRepository = AppDataSource.getRepository(Roles);
  const roles = (await rolesRepository.find()) as unknown;

  return roles as (Omit<Roles, "users" | "shift_start" | "shift_end"> & {
    // BUG:
    // sadly, typeorm returns time columns
    // as strings ('00:00:00'), even tho it takes a Date
    // to save.

    shift_start: string;
    shift_end: string;
  })[];
}
