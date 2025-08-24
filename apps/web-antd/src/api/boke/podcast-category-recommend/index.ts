import { requestClient } from '#/api/request';

export namespace PodcastCategoryRecommend {
  export interface PodcastCategoryRecommendInfo {
    id?: string;
    categoryId: string;
    grade: string;
    createTime?: Date;
  }

  export interface PodcastCategoryRecommendParams {
    pageNo: number;
    pageSize: number;
    categoryId?: string;
    grade?: string;
    createTime?: string;
  }
}

/** 获得平台播客分类推荐分页 */
export async function getPodcastCategoryRecommendPage(
  data?: PodcastCategoryRecommend.PodcastCategoryRecommendParams,
) {
  return requestClient.get('/platform/podcast-category-recommend/page', {
    params: data,
  });
}

/** 获得平台播客分类推荐 */
export async function getPodcastCategoryRecommend(id: string) {
  return requestClient.get<PodcastCategoryRecommend.PodcastCategoryRecommendInfo>(
    `/platform/podcast-category-recommend/get?id=${id}`,
  );
}

/** 创建平台播客分类推荐 */
export async function createPodcastCategoryRecommend(
  data: PodcastCategoryRecommend.PodcastCategoryRecommendInfo,
) {
  return requestClient.post(
    '/platform/podcast-category-recommend/create',
    data,
  );
}

/** 更新平台播客分类推荐 */
export async function updatePodcastCategoryRecommend(
  data: PodcastCategoryRecommend.PodcastCategoryRecommendInfo,
) {
  return requestClient.put('/platform/podcast-category-recommend/update', data);
}

/** 删除平台播客分类推荐 */
export async function deletePodcastCategoryRecommend(id: string) {
  return requestClient.delete(
    `/platform/podcast-category-recommend/delete?id=${id}`,
  );
}

/** 批量删除平台播客分类推荐 */
export async function deletePodcastCategoryRecommendList(ids: string[]) {
  return requestClient.delete(
    `/platform/podcast-category-recommend/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出平台播客分类推荐 Excel */
export async function exportPodcastCategoryRecommendExcel(
  data?: PodcastCategoryRecommend.PodcastCategoryRecommendParams,
) {
  return requestClient.get(
    '/platform/podcast-category-recommend/export-excel',
    {
      params: data,
      responseType: 'blob',
    },
  );
}
