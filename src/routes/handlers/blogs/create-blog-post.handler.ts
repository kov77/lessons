import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { postsRepository } from "../../../repositories/posts-repository";
import {
  mapPostInputDtoToPost,
  mapPostToViewDto,
} from "../../../mappers/post.mapper";

export const createBlogPostHandler = async (req: Request, res: Response) => {
  const blog = await blogsRepository.findById(req.params.id);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  const newPost = mapPostInputDtoToPost(
    { ...req.body, blogId: req.params.id },
    blog.name,
  );
  const createdPost = await postsRepository.create(newPost);
  res.status(201).send(mapPostToViewDto(createdPost));
};
