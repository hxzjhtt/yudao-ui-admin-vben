import { requestClient } from '#/api/request';

export namespace ApplicationList {
  /** 应用信息 */
  export interface Application {
    id?: string;
    appName: string;
    appCategoryId: string;
    appCategoryName: string;
    appType: string;
    appVersion: string;
    appSize: number;
    appDownloadUrl: string;
    appDescription: string;
    appStatus: string;
    createTime: Date;
  }
  /** 应用分类信息 */
  export interface ApplicationParams {
    pageNo: number;
    pageSize: number;
    appName?: string;
  }
}

/** 查询应用列表 */
export async function getApplicationList(
  data?: ApplicationList.ApplicationParams,
) {
  return requestClient.post('/platform/app/page', data);
}

/** 查询应用详情 */
export async function getApplication(id: string) {
  return requestClient.get<ApplicationList.Application>(
    `/platform/app/get?id=${id}`,
  );
}

/** 新增应用 */
export async function createApplication(data: ApplicationList.Application) {
  return requestClient.post('/platform/app/create', data);
}

/** 修改应用 */
export async function updateApplication(data: ApplicationList.Application) {
  return requestClient.put('/platform/app/update', data);
}

/** 删除应用 */
export async function deleteApplication(id: string) {
  return requestClient.delete(`/platform/app/delete?id=${id}`);
}

/** 批量删除应用 */
export async function deleteApplicationList(ids: number[]) {
  return requestClient.delete(`/platform/app/delete-list?ids=${ids.join(',')}`);
}
