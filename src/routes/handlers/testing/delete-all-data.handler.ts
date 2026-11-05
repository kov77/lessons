import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { postsRepository } from "../../../repositories/posts-repository";

export const deleteAllDataHandler = async (req: Request, res: Response) => {
  await blogsRepository.deleteAll();
  await postsRepository.deleteAll();
  res.sendStatus(204);
};
