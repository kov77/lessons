import { Request, Response, Router } from "express";
import { db } from "../db/db";
import { sendValidationError } from "../utils";

export const videosRouter = Router();

videosRouter.get("/", (req, res) => {
  res.status(200).send(db.videos);
});

videosRouter.post("/", (req, res) => {
  const newId = db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 0;

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

  db.videos.push({
    id: newId,
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toDateString(),
    publicationDate: new Date().toDateString(),
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
