import { config } from "../config/config.js";


// Global Error Handler Middleware
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message,
        errorStack: config.NODE_ENV === "development" ? err.stack : "",
    });
};

export default globalErrorHandler;
