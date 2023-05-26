export interface ApiResponse<T> {
  result: boolean;
  message: string;
  status: number;
  data: T;
}
