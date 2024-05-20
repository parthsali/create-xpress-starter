import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello from Server!" });
});

app.use(globalErrorHandler);

export default app;
