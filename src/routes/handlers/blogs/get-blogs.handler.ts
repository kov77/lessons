import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { mapBlogToViewDto } from "../../../mappers/blog.mapper";

export const getBlogsHandler = async (req: Request, res: Response) => {
  const blogs = await blogsRepository.findAll();
  res.status(200).send(blogs.map(mapBlogToViewDto));
};
