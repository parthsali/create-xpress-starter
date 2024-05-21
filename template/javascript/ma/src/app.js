import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import userRouter from "./api/user/userRouter.js";

// Express App Instance 
const app = express();

// Routes
app.get("/", (req, res, next) => {
    res
        .status(200)
        .json({ message: "Express Server built using create-xpress-starter" });
});


// User Router
app.use("/api/users", userRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
