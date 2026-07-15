export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}
export interface ApiErrorData {
  name: string;
  code: number;
  message: string;
}
