import { z } from "zod";
import { branchesGetAllOpts } from "../../routes/branches";
import { AppDataSource } from "../../database/datasource";
import Branches from "../../database/entities/branches";

export default function branchesGetAll({
  input,
}: {
  input: z.infer<typeof branchesGetAllOpts>;
}) {
  const branchesRepository = AppDataSource.getRepository(Branches);
  const branches = branchesRepository.find({ select: input?.select });
  return branches;
}
