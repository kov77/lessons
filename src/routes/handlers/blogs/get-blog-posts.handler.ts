import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { postsRepository } from "../../../repositories/posts-repository";
import { mapPostToViewDto } from "../../../mappers/post.mapper";
import { mapToPaginatedViewDto } from "../../../mappers/pagination.mapper";
import { parsePaginationQuery } from "../../../utils/pagination";
import { POST_SORT_FIELDS } from "../posts/get-posts.handler";

export const getBlogPostsHandler = async (req: Request, res: Response) => {
  const blog = await blogsRepository.findById(req.params.id);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  const pagination = parsePaginationQuery(req.query, POST_SORT_FIELDS);
  const { items, totalCount } = await postsRepository.findAll(
    pagination,
    req.params.id,
  );

  res
    .status(200)
    .send(
      mapToPaginatedViewDto(
        items.map(mapPostToViewDto),
        totalCount,
        pagination,
      ),
    );
};
