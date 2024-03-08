import { z } from "zod";
import { zscRolesUpsert } from "../../../../shared/schemas/roles";
import { AppDataSource } from "../../database/datasource";
import Roles from "../../database/entities/roles";

export default function rolesUpsert({
  input,
}: {
  input: z.infer<typeof zscRolesUpsert>;
}) {
  const rolesRepository = AppDataSource.getRepository(Roles);
  const saveResult = rolesRepository.save(input);

  return saveResult;
}
