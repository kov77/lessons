import { type Request, type Response } from "express";
import { postsRepository } from "../../../repositories/posts-repository";
import { mapPostToViewDto } from "../../../mappers/post.mapper";

export const getPostsHandler = async (req: Request, res: Response) => {
  const posts = await postsRepository.findAll();
  res.status(200).send(posts.map(mapPostToViewDto));
};
