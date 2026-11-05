import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { postsRepository } from "../../../repositories/posts-repository";
import { mapPostInputDtoToPostUpdate } from "../../../mappers/post.mapper";

export const updatePostHandler = async (req: Request, res: Response) => {
  // blogId existence is checked by the validator
  const blog = await blogsRepository.findById(req.body.blogId);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  const updated = await postsRepository.update(
    req.params.id,
    mapPostInputDtoToPostUpdate(req.body, blog.name),
  );

  if (!updated) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
};
