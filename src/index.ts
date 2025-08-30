import express from "express";
import { testsRouter } from "./routes/tests.router";
import { videosRouter } from "./routes/videos.router";
import { setupApp } from "./setup-app";
import { BLOGS_PATH, PORT, TESTING_PATH, VIDEOS_PATH } from "./constants";
import { blogsRouter } from "./routes/blogs.routes";

const app = express();
setupApp(app);

app.use(VIDEOS_PATH, videosRouter);
app.use(TESTING_PATH, testsRouter);
app.use(BLOGS_PATH, blogsRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;
