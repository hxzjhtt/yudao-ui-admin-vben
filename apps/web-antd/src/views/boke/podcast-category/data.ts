import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PodcastCategory } from '#/api/boke/podcast-category';

import { handleTree } from '@vben/utils';

import { getPodcastCategoryPage } from '#/api/boke/podcast-category';

/** 新增/修改的表单 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'id',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'pid',
      label: '上级分类',
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const { data } = await getPodcastCategoryPage({
            pageNo: 1,
            pageSize: 100,
          });
          const list = data || [];
          list.unshift({
            id: '0',
            podcastCategoryName: '顶级分类',
            pid: '',
            sort: 0,
            domain: '',
          });
          return handleTree(
            list.filter(
              (item: PodcastCategory.PodcastCategoryInfo) =>
                item.pid === '0' || item.id === '0',
            ),
            'id',
            'pid',
            'children',
          );
        },
        labelField: 'podcastCategoryName',
        valueField: 'id',
        childrenField: 'children',
        placeholder: '请选择上级分类',
        treeDefaultExpandAll: true,
      },
      rules: 'selectRequired',
    },
    {
      fieldName: 'podcastCategoryName',
      label: '分类名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入分类名称',
      },
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: '排序',
      component: 'InputNumber',
      componentProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入排序',
      },
      rules: 'required',
    },
    {
      fieldName: 'domain',
      label: '域',
      component: 'Input',
      componentProps: {
        placeholder: '如学科、名著、故事等，从字典来',
      },
      rules: 'required',
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<PodcastCategory.PodcastCategoryInfo>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'podcastCategoryName',
      title: '分类名称',
      align: 'left',
      fixed: 'left',
      treeNode: true,
    },
    {
      field: 'sort',
      title: '排序',
      width: 80,
    },
    {
      field: 'domain',
      title: '域',
      width: 120,
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 160,
      formatter: 'formatDateTime',
    },
    {
      title: '操作',
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
