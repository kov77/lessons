import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/async-handler";
import {
  blogPostValidationMiddleware,
  blogValidationMiddleware,
  handleValidationResult,
} from "../middlewares/validation/express-validator/input-validators";
import { getBlogsHandler } from "./handlers/blogs/get-blogs.handler";
import { createBlogHandler } from "./handlers/blogs/create-blog.handler";
import { getBlogHandler } from "./handlers/blogs/get-blog.handler";
import { updateBlogHandler } from "./handlers/blogs/update-blog.handler";
import { deleteBlogHandler } from "./handlers/blogs/delete-blog.handler";
import { getBlogPostsHandler } from "./handlers/blogs/get-blog-posts.handler";
import { createBlogPostHandler } from "./handlers/blogs/create-blog-post.handler";

export const blogsRouter = Router();

blogsRouter.get("/", asyncHandler(getBlogsHandler));

blogsRouter.post(
  "/",
  authMiddleware,
  ...blogValidationMiddleware,
  handleValidationResult,
  asyncHandler(createBlogHandler),
);

blogsRouter.get("/:id", asyncHandler(getBlogHandler));

blogsRouter.get("/:id/posts", asyncHandler(getBlogPostsHandler));

blogsRouter.post(
  "/:id/posts",
  authMiddleware,
  ...blogPostValidationMiddleware,
  handleValidationResult,
  asyncHandler(createBlogPostHandler),
);

blogsRouter.put(
  "/:id",
  authMiddleware,
  ...blogValidationMiddleware,
  handleValidationResult,
  asyncHandler(updateBlogHandler),
);

blogsRouter.delete("/:id", authMiddleware, asyncHandler(deleteBlogHandler));
