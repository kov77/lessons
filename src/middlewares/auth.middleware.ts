import { NextFunction, Request, Response } from "express";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../settings/config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const expected = `Basic ${Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString("base64")}`;

  if (req.headers.authorization !== expected) {
    res.sendStatus(401);
    return;
  }
  next();
};
