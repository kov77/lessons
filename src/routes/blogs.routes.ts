import { type Request, type Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs-repository";
import {
  blogValidationMiddleware,
  handleValidationResult,
} from "../middlewares/validation/express-validator/input-validators";

export const blogsRouter = Router();

blogsRouter.get("/", (req: Request, res: Response) => {
  const blogs = blogsRepository.getAllBlogs();
  res.status(200).send(blogs);
});

blogsRouter.post(
  "/",
  ...blogValidationMiddleware,
  handleValidationResult,
  (req: Request, res: Response) => {
    const newBlog = blogsRepository.addNewBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl,
    );
    res.status(201).send(newBlog);
  },
);
