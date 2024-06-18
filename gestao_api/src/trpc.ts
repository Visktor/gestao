import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createExpressContext = async (
  opts: CreateExpressContextOptions,
) => {
  return {
    req: opts.req,
  };
};

type Context = Awaited<ReturnType<typeof createExpressContext>>;
const trpc = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const publicProcedure = trpc.procedure;

const authMiddleware = trpc.middleware(({ ctx, next }) => {
  return next();
});
export const authProcedure = trpc.procedure.use(authMiddleware);

export default trpc;
