import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { mapBlogToViewDto } from "../../../mappers/blog.mapper";

export const getBlogHandler = async (req: Request, res: Response) => {
  const blog = await blogsRepository.findById(req.params.id);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send(mapBlogToViewDto(blog));
};
