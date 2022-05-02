export interface PaginatedData<T> {
  count: number;
  limit: number;
  offset: number;
  data: T[];
}

export interface PageInfo {
  count?: number;
  limit: number;
  offset: number;
  pageSize?: number;
}
