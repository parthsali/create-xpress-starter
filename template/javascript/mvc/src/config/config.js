import { config as configEnv } from "dotenv";

configEnv();

const _config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
