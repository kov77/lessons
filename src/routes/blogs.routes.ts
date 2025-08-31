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
    blogsRepository.addNewBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl,
    );
    res.status(201);
  },
);

blogsRouter.get(
  "/:id",
  handleValidationResult,
  (req: Request, res: Response) => {
    const id = req.params.id;
    const blog = blogsRepository.getAllBlogs().find((b) => b.id === id);

    if (!blog) {
      res.status(404).send({ error: "Blog doesn't exist" });
      return;
    }

    res.status(200).send(blog);
  },
);

blogsRouter.put(
  "/:id",
  ...blogValidationMiddleware,
  handleValidationResult,
  (req: Request, res: Response) => {
    const id = req.params.id;
    const blogIndex = blogsRepository
      .getAllBlogs()
      .findIndex((b) => b.id === id);

    if (blogIndex === -1) {
      res.status(404).send({ error: "Blog doesn't exist" });
      return;
    }

    const updatedBlog = {
      ...blogsRepository.getAllBlogs()[blogIndex],
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
    };

    blogsRepository.getAllBlogs()[blogIndex] = updatedBlog;

    res.status(200).send(updatedBlog);
  },
);

blogsRouter.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const blogIndex = blogsRepository.getAllBlogs().findIndex((b) => b.id === id);

  if (blogIndex === -1) {
    res.status(404).send({ error: "Blog doesn't exist" });
    return;
  }

  blogsRepository.getAllBlogs().splice(blogIndex, 1);

  res.sendStatus(204);
});
