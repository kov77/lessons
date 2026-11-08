import { type Request, type Response } from "express";
import { postsRepository } from "../../../repositories/posts-repository";
import { mapPostToViewDto } from "../../../mappers/post.mapper";
import { mapToPaginatedViewDto } from "../../../mappers/pagination.mapper";
import { parsePaginationQuery } from "../../../utils/pagination";

export const POST_SORT_FIELDS = [
  "createdAt",
  "title",
  "shortDescription",
  "content",
  "blogId",
  "blogName",
];

export const getPostsHandler = async (req: Request, res: Response) => {
  const pagination = parsePaginationQuery(req.query, POST_SORT_FIELDS);
  const { items, totalCount } = await postsRepository.findAll(pagination);

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
