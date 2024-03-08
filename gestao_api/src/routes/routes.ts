import trpc from "../trpc";
import branchesRouter from "./branches";
import rolesRouter from "./roles.router";
import usersRouter from "./users.router";

export const stdProcedure = trpc.procedure;

const appRouter = trpc.router({
  users: usersRouter,
  branches: branchesRouter,
  roles: rolesRouter
});

export default appRouter;

export type AppRouter = typeof appRouter;
