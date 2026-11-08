import { PaginationQuery, SortDirection } from "../types/pagination";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = "createdAt";
const DEFAULT_SORT_DIRECTION: SortDirection = "desc";

const toPositiveInt = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export const parsePaginationQuery = (
  query: Record<string, unknown>,
  allowedSortFields: string[],
): PaginationQuery => ({
  pageNumber: toPositiveInt(query.pageNumber, DEFAULT_PAGE_NUMBER),
  pageSize: toPositiveInt(query.pageSize, DEFAULT_PAGE_SIZE),
  sortBy: allowedSortFields.includes(query.sortBy as string)
    ? (query.sortBy as string)
    : DEFAULT_SORT_BY,
  sortDirection: query.sortDirection === "asc" ? "asc" : DEFAULT_SORT_DIRECTION,
});

export const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
