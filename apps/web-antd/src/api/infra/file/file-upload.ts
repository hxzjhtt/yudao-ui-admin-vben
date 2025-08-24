import { requestClient } from '#/api/request';

export namespace FileUpload {
  /** 文件创建请求 */
  export interface FileCreateReqVO {
    configId: number;
    path: string;
    name: string;
    url: string;
    type?: string;
    size: number;
  }

  /** 文件预签名响应 */
  export interface FilePresignedUrlRespVO {
    configId: number;
    uploadUrl: string;
    url: string;
    path: string;
  }

  /** 文件响应 */
  export interface FileRespVO {
    id: number;
    configId: number;
    path: string;
    name: string;
    url: string;
    type: string;
    size: number;
    createTime: string;
  }

  /** 文件分页参数 */
  export interface FilePageParams {
    pageNo: number;
    pageSize: number;
    path?: string;
    type?: string;
    createTime?: string;
  }

  /** 分页结果 */
  export interface PageResultFileRespVO {
    list: FileRespVO[];
    total: number;
  }
}

/** 上传文件 */
export async function uploadFile(file: File, directory?: string) {
  const formData = new FormData();
  formData.append('file', file);

  return requestClient.post('/infra/file/upload', formData, {
    params: { directory },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/** 创建文件记录 */
export async function createFile(data: FileUpload.FileCreateReqVO) {
  return requestClient.post('/infra/file/create', data);
}

/** 获取文件预签名地址 */
export async function getFilePresignedUrl(name: string, directory?: string) {
  return requestClient.get<FileUpload.FilePresignedUrlRespVO>(
    '/infra/file/presigned-url',
    {
      params: { name, directory },
    },
  );
}

/** 下载文件 */
export async function downloadFile(configId: number, path: string) {
  return requestClient.get(`/infra/file/${configId}/get/${path}`, {
    responseType: 'blob',
  });
}

/** 获取文件分页 */
export async function getFilePage(params: FileUpload.FilePageParams) {
  return requestClient.get<FileUpload.PageResultFileRespVO>(
    '/infra/file/page',
    { params },
  );
}

/** 删除文件 */
export async function deleteFile(id: number) {
  return requestClient.delete(`/infra/file/delete?id=${id}`);
}

/** 批量删除文件 */
export async function deleteFileList(ids: number[]) {
  return requestClient.delete(`/infra/file/delete-list?ids=${ids.join(',')}`);
}
