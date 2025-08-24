import { requestClient } from '#/api/request';

export namespace CollectionBindApp {
  /** 应用绑定信息 */
  export interface BindApp {
    id?: string;
    collectionId: string;
    appId: string;
    sort: number;
  }

  /** 应用绑定保存请求 */
  export interface BindAppSaveReqVO {
    collectionId: string;
    appIds: string[];
  }

  /** 应用绑定分页参数 */
  export interface BindAppParams {
    pageNo: number;
    pageSize: number;
    collectionId?: string;
    appId?: string;
    sort?: string;
  }
}

/** 查询应用绑定分页 */
export async function getCollectionBindAppPage(
  params: CollectionBindApp.BindAppParams,
) {
  return requestClient.get('/platform/collection-bind-app/page', { params });
}

/** 查询应用绑定详情 */
export async function getCollectionBindApp(id: string) {
  return requestClient.get<CollectionBindApp.BindApp>(
    `/platform/collection-bind-app/get?id=${id}`,
  );
}

/** 新增应用绑定 */
export async function createCollectionBindApp(data: CollectionBindApp.BindApp) {
  return requestClient.post('/platform/collection-bind-app/create', data);
}

/** 全量保存应用绑定 */
export async function createCollectionBindAppFull(
  data: CollectionBindApp.BindAppSaveReqVO,
) {
  return requestClient.post('/platform/collection-bind-app/create-full', data);
}

/** 修改应用绑定 */
export async function updateCollectionBindApp(data: CollectionBindApp.BindApp) {
  return requestClient.put('/platform/collection-bind-app/update', data);
}

/** 删除应用绑定 */
export async function deleteCollectionBindApp(id: string) {
  return requestClient.delete(`/platform/collection-bind-app/delete?id=${id}`);
}

/** 批量删除应用绑定 */
export async function deleteCollectionBindAppList(data: {
  appIds: string[];
  collectionId: string;
}) {
  return requestClient.delete('/platform/collection-bind-app/delete-list', {
    data,
  });
}

/** 导出应用绑定Excel */
export async function exportCollectionBindAppExcel(
  params: CollectionBindApp.BindAppParams,
) {
  return requestClient.get('/platform/collection-bind-app/export-excel', {
    params,
    responseType: 'blob',
  });
}
