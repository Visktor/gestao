import { AppDataSource } from "../../database/datasource";
import Plans from "../../database/entities/plans";
import { omit } from "lodash";

export default async function plansGetAll() {
  const plansRepository = AppDataSource.getRepository(Plans);

  const plans = await plansRepository.find({
    relations: {
      branch_links: true
    }
  });

  return plans.map((p) => ({
    branches: p.branch_links.map((bl) => bl.branch),
    ...omit(p, ["branch_links"]),
  }));
}
