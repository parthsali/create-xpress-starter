import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const startServer = () => {
  // Connect to MongoDB database
  connectDB();

  const PORT = config.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
