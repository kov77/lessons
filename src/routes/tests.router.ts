import { Response, Request, Router } from "express";
import { db } from "../db/db";

export const testsRouter = Router();

testsRouter.delete("/all-data", (req: Request, res: Response) => {
  db.videos = [];
  res.sendStatus(204);
});
