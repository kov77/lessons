import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import {
  mapBlogInputDtoToBlog,
  mapBlogToViewDto,
} from "../../../mappers/blog.mapper";

export const createBlogHandler = async (req: Request, res: Response) => {
  const newBlog = mapBlogInputDtoToBlog(req.body);
  const createdBlog = await blogsRepository.create(newBlog);
  res.status(201).send(mapBlogToViewDto(createdBlog));
};
