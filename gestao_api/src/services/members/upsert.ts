import { zscMembersUpsert } from "../../../../shared/schemas/members";
import { z } from "zod";
import { AppDataSource } from "../../database/datasource";
import Members from "../../database/entities/members";

export default function membersUpsert({
  input,
}: {
  input: z.infer<typeof zscMembersUpsert>;
}) {
  const membersRepo = AppDataSource.getRepository(Members);
  const upsertResult = membersRepo.save(input);

  return upsertResult;
}
