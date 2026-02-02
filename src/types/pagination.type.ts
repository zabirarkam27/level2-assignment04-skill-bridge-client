export interface PaginationControlsProps {
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
