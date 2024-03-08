import { z } from "zod";

export const zscPlansUpsert = z.object({
  plan_id: z.string().optional(),
  name: z.string().min(1),
  monthly_fee: z.coerce.number().gt(0),
  duration: z.coerce.number().gt(0).int(),
});
