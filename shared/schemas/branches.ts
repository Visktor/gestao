import { z } from "zod";

export const branchesUpsertInput = z.object({
  name: z.string().min(1),
  city: z.string().min(1),
  neighborhood: z.string().min(1),
  street: z.string().min(1),
  state: z.string().min(1),
});

export const branchesSelectInput = z.object({
  searchValue: z.string(),
  searchType: z.literal("id").or(z.literal("name")),
});
