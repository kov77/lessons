import { Router } from "express";
import { db } from "../db/db";
import type { Request, Response } from "express";

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
    publicationDate,
  } = req.body;

  const errors: { message: string; field: string }[] = [];

  if (!title || typeof title !== "string" || title.length > 40) {
    errors.push({
      field: "title",
      message: "Title must be string and max 40 chars",
    });
  }

  if (!author || typeof author !== "string" || author.length > 20) {
    errors.push({
      field: "author",
      message: "Author must be string and max 20 chars",
    });
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
    !Array.isArray(availableResolutions) ||
    !availableResolutions.every((r: string) => validResolutions.includes(r))
  ) {
    errors.push({
      field: "availableResolutions",
      message: "Invalid resolutions",
    });
  }

  if (canBeDownloaded && typeof canBeDownloaded !== "boolean") {
    errors.push({ field: "canBeDownloaded", message: "Must be boolean" });
  }

  if (
    minAgeRestriction &&
    (typeof minAgeRestriction !== "number" ||
      1 < minAgeRestriction ||
      minAgeRestriction > 18)
  ) {
    errors.push({
      field: "minAgeRestriction",
      message: "Must be a number from 1 to 18",
    });
  }

  if (
    publicationDate &&
    (typeof publicationDate !== "string" || isNaN(Date.parse(publicationDate)))
  ) {
    errors.push({
      field: "publicationDate",
      message: "Must be valid ISO string date",
    });
  }

  if (errors.length) {
    res.status(400).send({ errorsMessages: errors });
    return;
  }

  db.videos.push({
    id: newId,
    title,
    author,
    canBeDownloaded,
    minAgeRestriction,
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

  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
  } = req.body;

  const errors: { message: string; field: string }[] = [];

  if (!title || typeof title !== "string" || title.length > 40) {
    errors.push({
      field: "title",
      message: "Title must be string and max 40 chars",
    });
  }

  if (!author || typeof author !== "string" || author.length > 20) {
    errors.push({
      field: "author",
      message: "Author must be string and max 20 chars",
    });
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
    !Array.isArray(availableResolutions) ||
    !availableResolutions.every((r: string) => validResolutions.includes(r))
  ) {
    errors.push({
      field: "availableResolutions",
      message: "Invalid resolutions",
    });
  }

  if (canBeDownloaded && typeof canBeDownloaded !== "boolean") {
    errors.push({ field: "canBeDownloaded", message: "Must be boolean" });
  }

  if (
    minAgeRestriction &&
    (typeof minAgeRestriction !== "number" ||
      1 < minAgeRestriction ||
      minAgeRestriction > 18)
  ) {
    errors.push({
      field: "minAgeRestriction",
      message: "Must be a number from 1 to 18",
    });
  }

  if (
    publicationDate &&
    (typeof publicationDate !== "string" || isNaN(Date.parse(publicationDate)))
  ) {
    errors.push({
      field: "publicationDate",
      message: "Must be valid ISO string date",
    });
  }

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
