import { requestClient } from '#/api/request';

export namespace Podcast {
  export interface PodcastInfo {
    id?: string;
    categoryId: string;
    podcastName: string;
    grade: string;
    subject: string;
    remark?: string;
    icon?: string;
    background?: string;
    createTime?: Date;
  }

  export interface PodcastParams {
    pageNo: number;
    pageSize: number;
    categoryId?: string;
    categoryIds?: string;
    domain?: string;
    podcastName?: string;
    grade?: string;
    subject?: string;
    remark?: string;
    icon?: string;
    background?: string;
    createTime?: string;
  }
}

/** 获得播客分页 */
export async function getPodcastPage(data?: Podcast.PodcastParams) {
  return requestClient.get('/platform/podcast/page', { params: data });
}

/** 获得播客 */
export async function getPodcast(id: string) {
  return requestClient.get<Podcast.PodcastInfo>(
    `/platform/podcast/get?id=${id}`,
  );
}

/** 创建播客 */
export async function createPodcast(data: Podcast.PodcastInfo) {
  return requestClient.post('/platform/podcast/create', data);
}

/** 更新播客 */
export async function updatePodcast(data: Podcast.PodcastInfo) {
  return requestClient.put('/platform/podcast/update', data);
}

/** 删除播客 */
export async function deletePodcast(id: string) {
  return requestClient.delete(`/platform/podcast/delete?id=${id}`);
}

/** 批量删除播客 */
export async function deletePodcastList(ids: string[]) {
  return requestClient.delete(
    `/platform/podcast/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出播客 Excel */
export async function exportPodcastExcel(data?: Podcast.PodcastParams) {
  return requestClient.get('/platform/podcast/export-excel', {
    params: data,
    responseType: 'blob',
  });
}
