import { z } from "zod";
import { ObjectKeysEnum } from "./types/objectKeysEnum";

const getAllOpts = <T extends Record<string, any>>(entity: T) =>
  z
    .object({
      //@ts-expect-error
      select: ObjectKeysEnum<keyof T>(entity).array(),
    })
    .optional();

const zscUsersUpsert = z.object({
  user_id: z.string().uuid().optional(),
  email: z.string().email(),
  username: z.string().regex(/[a-z0-9](8,16)/gi),
  first_name: z.string(),
  last_name: z.string(),
  address: z.string(),
});

const zscUsersGetOne = z.string().uuid();

export { zscUsersUpsert, getAllOpts, zscUsersGetOne };
