import { AppDataSource } from "../../database/datasource";
import Branches from "../../database/entities/branches";
import { Like } from "typeorm";
import { branchesSelectInput } from "../../../../shared/schemas/branches";
import { z } from "zod";

export default async function branchesSelect({
  input,
}: {
  input: z.infer<typeof branchesSelectInput>;
}) {
  const branchesRepository = AppDataSource.getRepository(Branches);

  const branches = await branchesRepository.find({
    select: {
      name: true,
      branch_id: true,
    },
    where:
      input.searchType === "id"
        ? { branch_id: Like(input.searchValue) }
        : { name: Like(input.searchValue) },
  });

  return branches as {
    name: Branches["name"];
    branch_id: Branches["branch_id"];
  }[];
}
