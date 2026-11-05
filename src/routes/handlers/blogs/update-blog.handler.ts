import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { mapBlogInputDtoToBlogUpdate } from "../../../mappers/blog.mapper";

export const updateBlogHandler = async (req: Request, res: Response) => {
  const updated = await blogsRepository.update(
    req.params.id,
    mapBlogInputDtoToBlogUpdate(req.body),
  );

  if (!updated) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
};
