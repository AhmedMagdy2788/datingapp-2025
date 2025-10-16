export interface ApiError {
  message: string;
  statusCode: number;
  details?: string;
  errors?: { [key: string]: string[] };
}