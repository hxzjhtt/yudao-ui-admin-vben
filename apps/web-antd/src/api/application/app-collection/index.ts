import { requestClient } from '#/api/request';

export namespace AppCollection {
  /** 应用聚合信息 */
  export interface Collection {
    id?: string;
    collectionName: string;
    categoryName?: string;
    remake?: string;
    createTime?: string;
  }

  /** 应用聚合分页参数 */
  export interface CollectionParams {
    pageNo: number;
    pageSize: number;
    collectionName?: string;
    categoryName?: string;
    remake?: string;
    createTime?: string;
  }
}

/** 查询应用聚合分页 */
export async function getAppCollectionPage(
  params: AppCollection.CollectionParams,
) {
  return requestClient.get('/platform/app-collection/page', { params });
}

/** 查询应用聚合详情 */
export async function getAppCollection(id: string) {
  return requestClient.get<AppCollection.Collection>(
    `/platform/app-collection/get?id=${id}`,
  );
}

/** 新增应用聚合 */
export async function createAppCollection(data: AppCollection.Collection) {
  return requestClient.post('/platform/app-collection/create', data);
}

/** 修改应用聚合 */
export async function updateAppCollection(data: AppCollection.Collection) {
  return requestClient.put('/platform/app-collection/update', data);
}

/** 删除应用聚合 */
export async function deleteAppCollection(id: string) {
  return requestClient.delete(`/platform/app-collection/delete?id=${id}`);
}

/** 批量删除应用聚合 */
export async function deleteAppCollectionList(ids: string[]) {
  return requestClient.delete(
    `/platform/app-collection/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出应用聚合Excel */
export async function exportAppCollectionExcel(
  params: AppCollection.CollectionParams,
) {
  return requestClient.get('/platform/app-collection/export-excel', {
    params,
    responseType: 'blob',
  });
}
