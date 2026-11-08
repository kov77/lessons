import { PaginatedViewDto, PaginationQuery } from "../types/pagination";

export const mapToPaginatedViewDto = <T>(
  items: T[],
  totalCount: number,
  { pageNumber, pageSize }: PaginationQuery,
): PaginatedViewDto<T> => ({
  pagesCount: Math.ceil(totalCount / pageSize),
  page: pageNumber,
  pageSize,
  totalCount,
  items,
});
