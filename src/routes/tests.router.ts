import { Router } from "express";
import type { Request, Response } from "express";
import { postsRepository } from "../repositories/posts-repository";
import { blogsRepository } from "../repositories/blogs-repository";

export const testsRouter = Router();

testsRouter.delete("/all-data", (req: Request, res: Response) => {
  blogsRepository.deleteAllBlogs();
  postsRepository.deleteAllPosts();
  res.sendStatus(204);
});
