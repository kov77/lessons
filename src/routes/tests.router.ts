import { Router } from "express";
import { db } from "../db/db";
import type { Request, Response } from "express";

export const testsRouter = Router();

testsRouter.delete("/all-data", (req: Request, res: Response) => {
  db.videos = [];
  res.sendStatus(204);
});
