import { type Request, type Response } from "express";
import { postsRepository } from "../../../repositories/posts-repository";

export const deletePostHandler = async (req: Request, res: Response) => {
  const deleted = await postsRepository.delete(req.params.id);

  if (!deleted) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
};
