import { z } from "zod";

export const zscPlansUpsert = z.object({
  plan_id: z.string().optional(),
  name: z.string().min(1),
  monthly_fee: z.coerce.number().gt(0),
  duration: z.coerce.number().gt(0).int(),
  branches: z.array(z.string().uuid()), });

export const zscPlansSelect = z.object({
  searchValue: z.string(),
  searchType: z.literal("id").or(z.literal("name")),
});
