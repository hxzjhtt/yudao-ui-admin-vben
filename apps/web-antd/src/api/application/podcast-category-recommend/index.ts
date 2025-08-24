import { requestClient } from '#/api/request';

export namespace PodcastCategoryRecommend {
  /** 播客分类推荐信息 */
  export interface Recommend {
    id?: string;
    categoryId: string;
    grade: string;
    createTime?: string;
  }

  /** 播客分类推荐分页参数 */
  export interface RecommendParams {
    pageNo: number;
    pageSize: number;
    categoryId?: string;
    grade?: string;
    createTime?: string;
  }
}

/** 查询播客分类推荐分页 */
export async function getPodcastCategoryRecommendPage(
  params: PodcastCategoryRecommend.RecommendParams,
) {
  return requestClient.get('/platform/podcast-category-recommend/page', {
    params,
  });
}

/** 查询播客分类推荐详情 */
export async function getPodcastCategoryRecommend(id: string) {
  return requestClient.get<PodcastCategoryRecommend.Recommend>(
    `/platform/podcast-category-recommend/get?id=${id}`,
  );
}

/** 新增播客分类推荐 */
export async function createPodcastCategoryRecommend(
  data: PodcastCategoryRecommend.Recommend,
) {
  return requestClient.post(
    '/platform/podcast-category-recommend/create',
    data,
  );
}

/** 修改播客分类推荐 */
export async function updatePodcastCategoryRecommend(
  data: PodcastCategoryRecommend.Recommend,
) {
  return requestClient.put('/platform/podcast-category-recommend/update', data);
}

/** 删除播客分类推荐 */
export async function deletePodcastCategoryRecommend(id: string) {
  return requestClient.delete(
    `/platform/podcast-category-recommend/delete?id=${id}`,
  );
}

/** 批量删除播客分类推荐 */
export async function deletePodcastCategoryRecommendList(ids: string[]) {
  return requestClient.delete(
    `/platform/podcast-category-recommend/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出播客分类推荐Excel */
export async function exportPodcastCategoryRecommendExcel(
  params: PodcastCategoryRecommend.RecommendParams,
) {
  return requestClient.get(
    '/platform/podcast-category-recommend/export-excel',
    {
      params,
      responseType: 'blob',
    },
  );
}
