import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import appRouter from "./routes/routes";
import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
