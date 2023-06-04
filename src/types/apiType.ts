export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface ErrorResponse {
  data: unknown;
}
