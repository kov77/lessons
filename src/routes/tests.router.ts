import { Response, Router } from "express";
import { db } from "../db/db";

export const testsRouter = Router();

testsRouter.delete("/all-data", (_, res: Response) => {
  db.videos = [];
  res.sendStatus(204);
});
