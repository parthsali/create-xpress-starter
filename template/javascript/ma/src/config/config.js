import { config as configEnv } from "dotenv";

// Load the environment variables from the .env file
configEnv();

const _config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
};

// Freeze the config object to prevent further changes
export const config = Object.freeze(_config);
