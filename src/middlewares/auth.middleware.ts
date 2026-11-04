import { NextFunction, Request, Response } from "express";
import { SETTINGS } from "../settings";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { LOGIN, PASSWORD } = SETTINGS.CREDENTIALS;
  const expected = `Basic ${Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64")}`;

  if (req.headers.authorization !== expected) {
    res.sendStatus(401);
    return;
  }
  next();
};
