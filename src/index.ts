import express from "express";
import { testsRouter } from "./routes/tests.router";
import { videosRouter } from "./routes/videos.router";
import { setupApp } from "./setup-app";

export const app = express();
setupApp(app);

app.use("/hometask_01/api/videos", videosRouter);
app.use("/hometask_01/api/testing", testsRouter);
