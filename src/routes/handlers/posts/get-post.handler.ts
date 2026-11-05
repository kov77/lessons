import { type Request, type Response } from "express";
import { postsRepository } from "../../../repositories/posts-repository";
import { mapPostToViewDto } from "../../../mappers/post.mapper";

export const getPostHandler = async (req: Request, res: Response) => {
  const post = await postsRepository.findById(req.params.id);

  if (!post) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send(mapPostToViewDto(post));
};
