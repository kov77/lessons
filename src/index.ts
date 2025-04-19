import express from "express";
import { setupApp } from "./setup-app";
import { videosRouter } from "./routes/videos.router";
import { testsRouter } from "src/routes/tests.router";
import "tsconfig-paths/register";

export const app = express();
setupApp(app);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.use("/hometask_01/api/videos", videosRouter);
app.use("/hometask_01/api/testing", testsRouter);
