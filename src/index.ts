import express from "express";
import { testsRouter } from "./routes/tests.router";
import { videosRouter } from "./routes/videos.router";
import { setupApp } from "./setup-app";
import {
  API_PREFIX,
  BLOGS_PATH,
  POSTS_PATH,
  PORT,
  TESTING_PATH,
  VIDEOS_PATH,
} from "./constants";
import { blogsRouter } from "./routes/blogs.routes";
import { postsRouter } from "./routes/posts.routes";

const app = express();
setupApp(app);

app.use(VIDEOS_PATH, videosRouter);

// swagger paths (/ht_02/api/...) plus the same routes at the root
const apiRouter = express.Router();
apiRouter.use(TESTING_PATH, testsRouter);
apiRouter.use(BLOGS_PATH, blogsRouter);
apiRouter.use(POSTS_PATH, postsRouter);
app.use([API_PREFIX, "/"], apiRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;
