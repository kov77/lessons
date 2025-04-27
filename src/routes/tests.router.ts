import { Router } from "express";
import type { Request, Response } from "express";
import { videosRepository } from "../repositories/videos-repository";

export const testsRouter = Router();

testsRouter.delete("/all-data", (req: Request, res: Response) => {
  videosRepository.deleteAllVideos();
  res.sendStatus(204);
});
