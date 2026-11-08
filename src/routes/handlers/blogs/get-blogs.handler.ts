import { type Request, type Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { mapBlogToViewDto } from "../../../mappers/blog.mapper";
import { mapToPaginatedViewDto } from "../../../mappers/pagination.mapper";
import { parsePaginationQuery } from "../../../utils/pagination";

const BLOG_SORT_FIELDS = [
  "createdAt",
  "name",
  "description",
  "websiteUrl",
  "isMembership",
];

export const getBlogsHandler = async (req: Request, res: Response) => {
  const pagination = parsePaginationQuery(req.query, BLOG_SORT_FIELDS);
  const searchNameTerm =
    typeof req.query.searchNameTerm === "string"
      ? req.query.searchNameTerm
      : undefined;

  const { items, totalCount } = await blogsRepository.findAll(
    pagination,
    searchNameTerm,
  );

  res
    .status(200)
    .send(
      mapToPaginatedViewDto(
        items.map(mapBlogToViewDto),
        totalCount,
        pagination,
      ),
    );
};
