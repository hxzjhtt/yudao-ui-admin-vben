import { requestClient } from '#/api/request';

export namespace ApplicationClassification {
  /** 应用分类信息 */
  export interface Classification {
    id?: string;
    appCategoryName: string;
    pid?: string;
    sort: number;
    createTime: Date;
    children?: Classification[];
  }
}

/** 查询应用分类列表 */
export async function getClassificationList(params?: {
  appCategoryName?: string;
  createTime?: string;
  pageNo?: number;
  pageSize?: number;
  pid?: string;
  sort?: string;
}) {
  return requestClient.get('/platform/app-category/page', { params });
}

/** 查询应用分类详情 */
export async function getClassification(id: string) {
  return requestClient.get<ApplicationClassification.Classification>(
    `/platform/app-category/get?id=${id}`,
  );
}

/** 新增应用分类 */
export async function createClassification(
  data: ApplicationClassification.Classification,
) {
  return requestClient.post('/platform/app-category/create', data);
}

/** 修改应用分类 */
export async function updateClassification(
  data: ApplicationClassification.Classification,
) {
  return requestClient.put('/platform/app-category/update', data);
}

/** 删除应用分类 */
export async function deleteClassification(id: string) {
  return requestClient.delete(`/platform/app-category/delete?id=${id}`);
}

/** 批量删除应用分类 */
export async function deleteClassificationList(ids: number[]) {
  return requestClient.delete(
    `/platform/app-category/delete-list?ids=${ids.join(',')}`,
  );
}
