import { Router } from "express";
import type { Request, Response } from "express";
import { validateVideoInput } from "../utils";
import { videosRepository } from "src/repositories/videos-repository";

export const videosRouter = Router();

videosRouter.get("/", (req: Request, res: Response) => {
  const videos = videosRepository.getAllVideos();
  res.status(200).send(videos);
});

videosRouter.post("/", (req: Request, res: Response) => {
  const errors = validateVideoInput(req.body);
  if (errors.length) {
    res.status(400).send({ errorsMessages: errors });
    return;
  }
  const newVideo = videosRepository.addVideo(req.body);
  res.status(201).send(newVideo);
});

videosRouter.get("/:id", (req: Request, res: Response) => {
  const videoId = parseInt(req.params.id);
  if (videoId === undefined) {
    res.status(400).send({ error: "videoId is required" });
    return;
  }

  if (isNaN(videoId)) {
    res.status(400).send({ error: "videoId should be a number" });
    return;
  }

  const video = videosRepository.getVideoById(videoId);

  if (!video) {
    res.status(404).send({ error: "Video doesn't exist" });
    return;
  }

  res.status(200).send(video);
});

videosRouter.put("/:id", (req: Request, res: Response) => {
  const videoId = parseInt(req.params.id);
  if (videoId === undefined) {
    res.status(400).send({ error: "videoId is required" });
    return;
  }

  if (isNaN(videoId)) {
    res.status(400).send({ error: "videoId should be a number" });
    return;
  }

  const video = videosRepository.updateVideo(videoId, req.body);

  if (!video) {
    res.status(404).send({ error: "Video doesn't exist" });
    return;
  }

  const errors = validateVideoInput(req.body);
  if (errors.length) {
    res.status(400).send({ errorsMessages: errors });
    return;
  }

  res.sendStatus(204);
});

videosRouter.delete("/:id", (req: Request, res: Response) => {
  const videoId = parseInt(req.params.id);
  if (videoId === undefined) {
    res.status(400).send({ error: "videoId is required" });
    return;
  }

  if (isNaN(videoId)) {
    res.status(400).send({ error: "videoId should be a number" });
    return;
  }

  const video = videosRepository.deleteVideo(videoId);

  if (!video) {
    res.status(404).send({ error: "Video doesn't exist" });
    return;
  }

  res.sendStatus(204);
});
