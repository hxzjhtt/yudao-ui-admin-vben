import { requestClient } from '#/api/request';

export namespace PodcastCategory {
  /** 播客分类信息 */
  export interface Category {
    id?: string;
    podcastCategoryName: string;
    pid: string;
    sort: number;
    domain: string;
    createTime?: string;
  }

  /** 播客分类分页参数 */
  export interface CategoryParams {
    pageNo: number;
    pageSize: number;
    podcastCategoryName?: string;
    pid?: string;
    sort?: string;
    domain?: string;
    createTime?: string;
  }
}

/** 查询播客分类分页 */
export async function getPodcastCategoryPage(
  params: PodcastCategory.CategoryParams,
) {
  return requestClient.get('/platform/podcast-category/page', { params });
}

/** 查询播客分类详情 */
export async function getPodcastCategory(id: string) {
  return requestClient.get<PodcastCategory.Category>(
    `/platform/podcast-category/get?id=${id}`,
  );
}

/** 新增播客分类 */
export async function createPodcastCategory(data: PodcastCategory.Category) {
  return requestClient.post('/platform/podcast-category/create', data);
}

/** 修改播客分类 */
export async function updatePodcastCategory(data: PodcastCategory.Category) {
  return requestClient.put('/platform/podcast-category/update', data);
}

/** 删除播客分类 */
export async function deletePodcastCategory(id: string) {
  return requestClient.delete(`/platform/podcast-category/delete?id=${id}`);
}

/** 批量删除播客分类 */
export async function deletePodcastCategoryList(ids: string[]) {
  return requestClient.delete(
    `/platform/podcast-category/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出播客分类Excel */
export async function exportPodcastCategoryExcel(
  params: PodcastCategory.CategoryParams,
) {
  return requestClient.get('/platform/podcast-category/export-excel', {
    params,
    responseType: 'blob',
  });
}
