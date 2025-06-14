interface findAllOrQueryResponseDto {
  data: Products[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pages: number[];
}
