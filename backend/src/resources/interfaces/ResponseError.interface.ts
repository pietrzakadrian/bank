export interface ResponseError {
  success: boolean;
  code: number;
  error?: any[] | object | string;
}
