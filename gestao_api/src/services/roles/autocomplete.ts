import { z } from "zod";
import { zscRolesAutocomplete } from "../../../../shared/schemas/roles";
import { AppDataSource } from "../../database/datasource";
import Roles from "../../database/entities/roles";
import { FindManyOptions, Like } from "typeorm";
import { Unpacked } from "../../@types/utils";

export default async function rolesAutocomplete({
  input,
}: {
  input: z.infer<typeof zscRolesAutocomplete>;
}) {
  const rolesRep = AppDataSource.getRepository(Roles);
  const findOptions: FindManyOptions<Roles> = {
    select: ["name", "role_id"],
    take: 50,
  };

  if (input.searchValue) {
    findOptions.where = {
      [input.searchType === "id" ? "role_id" : "name"]: Like(
        `${input.searchType === "id" ? "" : "%"}` + input.searchValue + "%",
      ),
    };
  }

  const roles = await rolesRep.find(findOptions);

  return roles as Pick<Unpacked<typeof roles>, "role_id" | "name">[];
}
