import { Router } from "express";
import { db } from "../db/db";
import type { Request, Response } from "express";
import { validateVideoInput } from "src/utils";

export const videosRouter = Router();

videosRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(db.videos);
});

videosRouter.post("/", (req: Request, res: Response) => {
  const newId = db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 0;
  const now = new Date();
  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
  } = req.body;

  const errors = validateVideoInput(req.body);
  if (errors.length) {
    res.status(400).send({ errorsMessages: errors });
    return;
  }

  db.videos.push({
    id: newId,
    title,
    author,
    canBeDownloaded: canBeDownloaded ?? false,
    minAgeRestriction: minAgeRestriction ?? null,
    createdAt: now.toISOString(),
    publicationDate: new Date(
      now.getTime() + 24 * 60 * 60 * 1000,
    ).toISOString(),
    availableResolutions,
  });

  res.status(201).send(db.videos[newId]);
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

  if (!db.videos[videoId]) {
    res.status(404).send({ error: "Video doesn't exist" });
    return;
  }

  res.status(200).send(db.videos[videoId]);
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

  if (!db.videos[videoId]) {
    res.status(404).send({ error: "Video doesn't exist" });
    return;
  }

  const errors = validateVideoInput(req.body);
  if (errors.length) {
    res.status(400).send({ errorsMessages: errors });
    return;
  }

  db.videos[videoId] = { ...db.videos[videoId], ...req.body };

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

  if (!db.videos[videoId]) {
    res.status(404).send({ error: "Video doesn't exist" });
    return;
  }

  db.videos.splice(videoId, 1);

  res.sendStatus(204);
});
