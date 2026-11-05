import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/async-handler";
import {
  handleValidationResult,
  postValidationMiddleware,
} from "../middlewares/validation/express-validator/input-validators";
import { getPostsHandler } from "./handlers/posts/get-posts.handler";
import { createPostHandler } from "./handlers/posts/create-post.handler";
import { getPostHandler } from "./handlers/posts/get-post.handler";
import { updatePostHandler } from "./handlers/posts/update-post.handler";
import { deletePostHandler } from "./handlers/posts/delete-post.handler";

export const postsRouter = Router();

postsRouter.get("/", asyncHandler(getPostsHandler));

postsRouter.post(
  "/",
  authMiddleware,
  ...postValidationMiddleware,
  handleValidationResult,
  asyncHandler(createPostHandler),
);

postsRouter.get("/:id", asyncHandler(getPostHandler));

postsRouter.put(
  "/:id",
  authMiddleware,
  ...postValidationMiddleware,
  handleValidationResult,
  asyncHandler(updatePostHandler),
);

postsRouter.delete("/:id", authMiddleware, asyncHandler(deletePostHandler));
