import { type Request, type Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs-repository";

export const blogsRouter = Router();

blogsRouter.get("/", (req: Request, res: Response) => {
  const blogs = blogsRepository.getAllBlogs();
  res.status(200).send(blogs);
});
