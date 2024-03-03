import { z } from "zod";
import { branchesUpsertInput } from "../../../../shared/schemas/branches";
import { AppDataSource } from "../../database/datasource";
import Branches from "../../database/entities/branches";
export default function branchesUpsert({
  input,
}: {
  input: z.infer<typeof branchesUpsertInput>;
}) {
  const branchesRepository = AppDataSource.getRepository(Branches);
  const upsertResult = branchesRepository.save(input);

  return upsertResult;
}
