import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";



const startServer = () => {
    connectDB();

    const PORT = config.PORT || 8080;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Start the server
startServer();
