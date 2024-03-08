import { z } from "zod";
import { zscPlansUpsert } from "../../../../shared/schemas/plans";
import { AppDataSource } from "../../database/datasource";
import Plans from "../../database/entities/plans";

export default async function plansUpsert({
  input,
}: {
  input: z.infer<typeof zscPlansUpsert>;
}) {
  const plansRepository = AppDataSource.getRepository(Plans);
  const upsertResult = await plansRepository.save(input);

  return upsertResult
}
