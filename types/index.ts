export interface ResponseError {
  message: string;
  response: {
    status: number;
    statusText: string;
    data: {
      message: string;
    };
  };
}
