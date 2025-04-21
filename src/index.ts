import express from "express";
import { testsRouter } from "./routes/tests.router";
import { videosRouter } from "./routes/videos.router";
import { setupApp } from "./setup-app";

const app = express();
setupApp(app);

app.use("/videos", videosRouter);
app.use("/testing", testsRouter);

export default app;
