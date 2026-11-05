import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { postsRepository } from "../../../repositories/posts-repository";
import {
  mapPostInputDtoToPost,
  mapPostToViewDto,
} from "../../../mappers/post.mapper";

export const createPostHandler = async (req: Request, res: Response) => {
  // blogId existence is checked by the validator
  const blog = await blogsRepository.findById(req.body.blogId);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  const newPost = mapPostInputDtoToPost(req.body, blog.name);
  const createdPost = await postsRepository.create(newPost);
  res.status(201).send(mapPostToViewDto(createdPost));
};
