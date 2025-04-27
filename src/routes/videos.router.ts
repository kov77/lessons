import { Router } from "express";
import type { Request, Response } from "express";
import { videosRepository } from "../repositories/videos-repository";
import {
  handleValidationResult,
  videoIdValidator,
  videoNotIsNaNValidator,
  videoValidationMiddleware,
} from "../middlewares/validation/express-validator/input-validators";

export const videosRouter = Router();

videosRouter.get("/", (req: Request, res: Response) => {
  const videos = videosRepository.getAllVideos();
  res.status(200).send(videos);
});

videosRouter.post(
  "/",
  ...videoValidationMiddleware,
  handleValidationResult,
  (req: Request, res: Response) => {
    const newVideo = videosRepository.addVideo(req.body);
    res.status(201).send(newVideo);
  },
);

videosRouter.get(
  "/:id",
  videoIdValidator,
  handleValidationResult,
  (req: Request, res: Response) => {
    const videoId = parseInt(req.params.id);

    const video = videosRepository.getVideoById(videoId);

    if (!video) {
      res.status(404).send({ error: "Video doesn't exist" });
      return;
    }

    res.status(200).send(video);
  },
);

videosRouter.put(
  "/:id",
  videoIdValidator,
  videoNotIsNaNValidator,
  ...videoValidationMiddleware,
  handleValidationResult,
  (req: Request, res: Response) => {
    const videoId = parseInt(req.params.id);

    const video = videosRepository.updateVideo(videoId, req.body);

    if (!video) {
      res.status(404).send({ error: "Video doesn't exist" });
      return;
    }

    res.sendStatus(204);
  },
);

videosRouter.delete(
  "/:id",
  videoIdValidator,
  handleValidationResult,
  (req: Request, res: Response) => {
    const videoId = parseInt(req.params.id);

    const video = videosRepository.deleteVideo(videoId);

    if (!video) {
      res.status(404).send({ error: "Video doesn't exist" });
      return;
    }

    res.sendStatus(204);
  },
);
