import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { Request, Response, NextFunction } from "express";

const app = express();

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json({ message: "Express Server built using create-xpress-starter" });
});

app.use(globalErrorHandler);

export default app;
