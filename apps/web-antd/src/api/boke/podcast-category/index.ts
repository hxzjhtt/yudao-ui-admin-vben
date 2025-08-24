import { requestClient } from '#/api/request';

export namespace PodcastCategory {
  export interface PodcastCategoryInfo {
    id?: string;
    podcastCategoryName: string;
    pid: string;
    sort: number;
    domain: string;
    createTime?: Date;
  }

  export interface PodcastCategoryParams {
    pageNo: number;
    pageSize: number;
    podcastCategoryName?: string;
    pid?: string;
    sort?: string;
    domain?: string;
    createTime?: string;
  }
}

/** 获得平台播客分类分页 */
export async function getPodcastCategoryPage(
  data?: PodcastCategory.PodcastCategoryParams,
) {
  return requestClient.get('/platform/podcast-category/page', { params: data });
}

/** 获得平台播客分类 */
export async function getPodcastCategory(id: string) {
  return requestClient.get<PodcastCategory.PodcastCategoryInfo>(
    `/platform/podcast-category/get?id=${id}`,
  );
}

/** 创建平台播客分类 */
export async function createPodcastCategory(
  data: PodcastCategory.PodcastCategoryInfo,
) {
  return requestClient.post('/platform/podcast-category/create', data);
}

/** 更新平台播客分类 */
export async function updatePodcastCategory(
  data: PodcastCategory.PodcastCategoryInfo,
) {
  return requestClient.put('/platform/podcast-category/update', data);
}

/** 删除平台播客分类 */
export async function deletePodcastCategory(id: string) {
  return requestClient.delete(`/platform/podcast-category/delete?id=${id}`);
}

/** 批量删除平台播客分类 */
export async function deletePodcastCategoryList(ids: string[]) {
  return requestClient.delete(
    `/platform/podcast-category/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出平台播客分类 Excel */
export async function exportPodcastCategoryExcel(
  data?: PodcastCategory.PodcastCategoryParams,
) {
  return requestClient.get('/platform/podcast-category/export-excel', {
    params: data,
    responseType: 'blob',
  });
}
