import { type Request, type Response, Router } from "express";
import { postsRepository } from "../repositories/posts-repository";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  handleValidationResult,
  postValidationMiddleware,
} from "../middlewares/validation/express-validator/input-validators";

export const postsRouter = Router();

postsRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(postsRepository.getAllPosts());
});

postsRouter.post(
  "/",
  authMiddleware,
  ...postValidationMiddleware,
  handleValidationResult,
  (req: Request, res: Response) => {
    const { title, shortDescription, content, blogId } = req.body;
    const newPost = postsRepository.addNewPost(
      title,
      shortDescription,
      content,
      blogId,
    );
    res.status(201).send(newPost);
  },
);

postsRouter.get("/:id", (req: Request, res: Response) => {
  const post = postsRepository.getPostById(req.params.id);

  if (!post) {
    res.status(404).send({ error: "Post doesn't exist" });
    return;
  }

  res.status(200).send(post);
});

postsRouter.put(
  "/:id",
  authMiddleware,
  ...postValidationMiddleware,
  handleValidationResult,
  (req: Request, res: Response) => {
    const { title, shortDescription, content, blogId } = req.body;
    const updated = postsRepository.updatePost(
      req.params.id,
      title,
      shortDescription,
      content,
      blogId,
    );

    if (!updated) {
      res.status(404).send({ error: "Post doesn't exist" });
      return;
    }

    res.sendStatus(204);
  },
);

postsRouter.delete("/:id", authMiddleware, (req: Request, res: Response) => {
  if (!postsRepository.deletePost(req.params.id)) {
    res.status(404).send({ error: "Post doesn't exist" });
    return;
  }

  res.sendStatus(204);
});
