import express from "express";
import { Response } from "express";
import { setupApp } from "./setup-app";
import { db } from "./db/db";
import { videosRouter } from "./routes/videos.router";

export const app = express();
setupApp(app);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.use("/hometask_01/api/videos", videosRouter);

app.delete("/hometask_01/api/testing/all-data", (_, res: Response) => {
  db.videos = [];
  res.sendStatus(204).send("All data is deleted");
});
