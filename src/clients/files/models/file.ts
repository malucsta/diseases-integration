export interface FileResponse {
  status: string;
  data: FileResponseData;
}

export interface FileResponseData {
  downloadPage: string;
  code: string;
  parentFolder: string;
  fileId: string;
  fileName: string;
  md5: string;
}
