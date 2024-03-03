import trpc from "../trpc";
import branchesRouter from "./branches";
import usersRouter from "./users.router";

const appRouter = trpc.router({
  users: usersRouter,
  branches: branchesRouter,
});

export default appRouter;

export type AppRouter = typeof appRouter;
