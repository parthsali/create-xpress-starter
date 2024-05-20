import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";

import userRouter from "./api/User/userRouter";

const app = express();

// Routes
app.use("/api/users", userRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
