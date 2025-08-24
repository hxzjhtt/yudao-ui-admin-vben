import { requestClient } from '#/api/request';

export namespace AppGrade {
  /** 应用等级信息 */
  export interface Grade {
    id?: string;
    appId: string;
    appGrade: string;
  }

  /** 应用等级分页参数 */
  export interface GradeParams {
    pageNo: number;
    pageSize: number;
    appId?: string;
    appGrade?: string;
  }
}

/** 查询应用等级分页 */
export async function getAppGradePage(params: AppGrade.GradeParams) {
  return requestClient.get('/platform/app-grade/page', { params });
}

/** 查询应用等级详情 */
export async function getAppGrade(id: string) {
  return requestClient.get<AppGrade.Grade>(`/platform/app-grade/get?id=${id}`);
}

/** 新增应用等级 */
export async function createAppGrade(data: AppGrade.Grade) {
  return requestClient.post('/platform/app-grade/create', data);
}

/** 修改应用等级 */
export async function updateAppGrade(data: AppGrade.Grade) {
  return requestClient.put('/platform/app-grade/update', data);
}

/** 删除应用等级 */
export async function deleteAppGrade(id: string) {
  return requestClient.delete(`/platform/app-grade/delete?id=${id}`);
}

/** 批量删除应用等级 */
export async function deleteAppGradeList(ids: string[]) {
  return requestClient.delete(
    `/platform/app-grade/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出应用等级Excel */
export async function exportAppGradeExcel(params: AppGrade.GradeParams) {
  return requestClient.get('/platform/app-grade/export-excel', {
    params,
    responseType: 'blob',
  });
}
