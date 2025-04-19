import { Response, Router } from "express";
import { db } from "src/db/db";

export const testsRouter = Router();

testsRouter.delete("/all-data", (_, res: Response) => {
  db.videos = [];
  res.sendStatus(204).send("All data is deleted");
});
