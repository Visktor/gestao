import { AppDataSource } from "../../database/datasource";
import Plans from "../../database/entities/plans";

export default async function plansGetAll() {
  const plansRepository = AppDataSource.getRepository(Plans);

  const plans = await plansRepository.find();

  return plans;
}
