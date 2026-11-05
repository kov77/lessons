import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";

export const deleteBlogHandler = async (req: Request, res: Response) => {
  const deleted = await blogsRepository.delete(req.params.id);

  if (!deleted) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
};
