import { AppDataSource } from "../../database/datasource";
import Plans from "../../database/entities/plans";

export default async function plansDeleteOne({
  input: plan_id,
}: {
  input: string;
}) {
  const plansRepo = AppDataSource.getRepository(Plans);
  const deleteResult = await plansRepo.softDelete(plan_id);
  return deleteResult;
}
