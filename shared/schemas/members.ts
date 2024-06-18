import { z } from "zod";

export const zscMembersUpsert = z
  .object({
    member_id: z.string().uuid().optional(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
    join_date: z.date(),
    branch_id: z
      .object({ branch_id: z.string().uuid(), name: z.string() })
      .transform((v) => v.branch_id)
      .or(z.string().uuid()),
    plan_id: z.string().uuid(),
    status: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  })
  .required();
