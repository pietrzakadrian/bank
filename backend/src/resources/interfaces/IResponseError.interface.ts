export interface IResponseError {
  success: boolean;
  code: number;
  error?: any[] | object | string;
}
