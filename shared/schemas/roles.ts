import { z } from "zod";

export const zscRolesUpsert = z.object({
  role_id: z.string().optional(),
  permissions: z.object({
    create_user: z.boolean(),
    update_role: z.boolean(),
    manage_equipment: z.boolean(),
    schedule_classes: z.boolean(),
  }),
  salary: z.coerce.number().pipe(z.coerce.string()),
  shift_start: z.coerce.date(),
  shift_end: z.coerce.date(),
  name: z.string().min(1),
});

export const zscRolesAutocomplete = z.object({
  searchValue: z.string(),
  searchType: z.literal("id").or(z.literal("name")),
});
