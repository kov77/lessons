import express, { Express } from "express";
import cors from "cors";
import type { Request, Response } from "express";
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH, VIDEOS_PATH } from "./constants";
import { blogsRouter } from "./routes/blogs.routes";
import { postsRouter } from "./routes/posts.routes";
import { testsRouter } from "./routes/tests.router";
import { videosRouter } from "./routes/videos.router";

export const setupApp = (app: Express) => {
  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello world!");
  });

  app.use(VIDEOS_PATH, videosRouter);
  app.use(TESTING_PATH, testsRouter);
  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);

  return app;
};
