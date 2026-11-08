export type SortDirection = "asc" | "desc";

export type PaginationQuery = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
};

export type PaginatedViewDto<T> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};
