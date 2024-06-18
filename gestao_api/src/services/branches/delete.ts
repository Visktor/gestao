import { AppDataSource } from "../../database/datasource";
import Branches from "../../database/entities/branches";

export default async function branchesDelete({
  input: branch_id,
}: {
  input: string;
}) {
  const branchesRepo = AppDataSource.getRepository(Branches);
  const deleteResult = await branchesRepo.softDelete({ branch_id });
  return deleteResult;
}
