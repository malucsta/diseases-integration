export interface GoFileResponse {
  status: string;
  data: GoFileResponseData;
}

export interface GoFileResponseData {
  downloadPage: string;
  code: string;
  parentFolder: string;
  fileId: string;
  fileName: string;
  md5: string;
}
