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
  username: z.string().regex(/^[a-z0-9]{8,16}$/gi),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  address: z.string().min(1),
  branch_id: z.string().uuid(),
  role_id: z.string().uuid(),
});

const zscUsersGetOne = z.string().uuid();

export { zscUsersUpsert, getAllOpts, zscUsersGetOne };
