import { Router } from "express";
import { db } from "../db/db";
import { sendValidationError } from "../utils";
import type { Request, Response } from "express";

export const videosRouter = Router();

videosRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(db.videos);
});

videosRouter.post("/", (req: Request, res: Response) => {
  const newId = db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 0;
  const now = new Date();

  if (!req.body.title) {
    sendValidationError(res, "title", "Title is required");
    return;
  }

  if (!req.body.author) {
    sendValidationError(res, "author", "Author is required");
    return;
  }

  if (!req.body.availableResolutions) {
    sendValidationError(
      res,
      "availableResolutions",
      "Available resolutions are required",
    );
    return;
  }

  if (typeof req.body.title !== "string" || req.body.title.length > 40) {
    sendValidationError(res, "title", "Title must be string and max 40 chars");
    return;
  }

  const validResolutions = [
    "P144",
    "P240",
    "P360",
    "P480",
    "P720",
    "P1080",
    "P1440",
    "P2160",
  ];
  if (
    !Array.isArray(req.body.availableResolutions) ||
    !req.body.availableResolutions.every((r: string) =>
      validResolutions.includes(r),
    )
  ) {
    sendValidationError(
      res,
      "availableResolutions",
      "Available resolutions are invalid",
    );
    return;
  }

  db.videos.push({
    id: newId,
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: now.toISOString(),
    publicationDate: new Date(
      now.getTime() + 24 * 60 * 60 * 1000,
    ).toISOString(),
    availableResolutions: req.body.availableResolutions,
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

  if (!req.body.title) {
    res.status(400).send({ error: "Title is required" });
    return;
  }

  if (!req.body.author) {
    res.status(400).send({ error: "Author is required" });
    return;
  }

  if (!req.body.availableResolutions) {
    res.status(400).send({ error: "Available resolutions are required" });
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
