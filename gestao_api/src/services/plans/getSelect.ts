import { FindManyOptions, Like } from "typeorm";
import { zscPlansSelect } from "../../../../shared/schemas/plans";
import { AppDataSource } from "../../database/datasource";
import Plans from "../../database/entities/plans";
import { z } from "zod";

export default async function plansGetSelect({
  input,
}: {
  input: z.infer<typeof zscPlansSelect>;
}) {
  const plansRepo = AppDataSource.getRepository(Plans);

  const findOptions: FindManyOptions<Plans> = {
    select: {
      name: true,
      plan_id: true,
    },
  };

  if (!!input.searchValue) {
    findOptions.where =
      input.searchType === "id"
        ? { plan_id: Like(`${input.searchValue}%`) }
        : { name: Like(`%${input.searchValue}%`) };
  }

  const selectResult = await plansRepo.find({
    select: {
      name: true,
      plan_id: true,
    },
    loadEagerRelations: false,
  });

  return selectResult;
}
