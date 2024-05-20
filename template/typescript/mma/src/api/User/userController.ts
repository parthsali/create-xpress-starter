// User Controller

import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const exampleController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: "Example Controller" });
};
