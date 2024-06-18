import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import appRouter from "./routes/routes";
import cors from "cors";
import logger from "./logger";
import dotenv from "dotenv";
import { createExpressContext } from "./trpc";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    onError: ({ error, path }) => {
      logger.error(`url: ${path}, error: ${error.message}`);
    },
    createContext: createExpressContext,
  }),
);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
