import mongoose from "mongoose";
import { config } from "./config.js";

// Connect to MongoDB using Mongoose ORM 
const connectDB = () => {
    mongoose
        .connect(config.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB successfully!");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB: ", error.message);
        });
};

export default connectDB;
