import { z } from "zod";
import { zscPlansUpsert } from "../../../../shared/schemas/plans";
import { AppDataSource } from "../../database/datasource";
import Plans from "../../database/entities/plans";
import { TRPCError } from "@trpc/server";
import LinkerPlansBranches from "../../database/entities/plans_branches";

export default async function plansUpsert({
  input,
}: {
  input: z.infer<typeof zscPlansUpsert>;
}) {
  const plansRepo = AppDataSource.getRepository(Plans);
  const linkerRepo = AppDataSource.getRepository(LinkerPlansBranches);

  const upsertResult = await plansRepo.save({
    plan_id: input.plan_id,
    name: input.name,
    duration: input.duration,
    monthly_fee: input.monthly_fee,
  });

  if (!upsertResult.plan_id) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }

  // Delete previous links just in case it's an update
  await linkerRepo.delete({
    plan_id: upsertResult.plan_id,
  });

  await linkerRepo.save(
    input.branches.map((b) => ({
      branch_id: b,
      plan_id: upsertResult.plan_id,
    })),
  );

  return upsertResult;
}
