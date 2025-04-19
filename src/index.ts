import express from "express";
import { Request, Response } from "express";
import { setupApp } from "./setup-app";
import { db } from "./db/db";

export const app = express();
setupApp(app);

const sendValidationError = (
  res: Response,
  field: string,
  message: string,
  statusCode = 400,
) => {
  res.status(statusCode).send({
    errorsMessages: [
      {
        message,
        field,
      },
    ],
  });
};

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/hometask_01/api/videos", (req, res) => {
  res.status(200).send(db.videos);
});

app.post("/hometask_01/api/videos", (req, res) => {
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

app.get("/hometask_01/api/videos/:id", (req: Request, res: Response) => {
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

app.put("/hometask_01/api/videos/:id", (req: Request, res: Response) => {
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

app.delete("/hometask_01/api/videos/:id", (req: Request, res: Response) => {
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

app.delete("/hometask_01/api/testing/all-data", (_, res: Response) => {
  db.videos = [];
  res.sendStatus(204).send("All data is deleted");
});
