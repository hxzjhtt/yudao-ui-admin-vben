import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { getPodcastCategoryPage } from '#/api/boke/podcast-category';
import { DICT_TYPE, getDictOptions, getRangePickerDefaultProps } from '#/utils';

/** 新增/修改的表单 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'id',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      component: 'ApiSelect',
      fieldName: 'categoryId',
      label: '播客分类',
      componentProps: {
        allowClear: true,
        api: async () => {
          const { data } = await getPodcastCategoryPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item: any) => ({
            label: item.podcastCategoryName,
            value: item.id,
          }));
        },
        placeholder: '请选择播客分类',
      },
      rules: 'required',
    },
    {
      component: 'Select',
      fieldName: 'grade',
      label: '推荐年级',
      componentProps: {
        options: getDictOptions(DICT_TYPE.GRADE, 'string'),
        placeholder: '请选择推荐年级',
      },
      rules: 'required',
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'createTime',
      label: '创建时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
      },
    },
    {
      fieldName: 'categoryId',
      label: '播客分类',
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const { data } = await getPodcastCategoryPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item: any) => ({
            label: item.podcastCategoryName,
            value: item.id,
          }));
        },
        placeholder: '请选择播客分类',
      },
    },
    {
      component: 'Select',
      fieldName: 'grade',
      label: '推荐年级',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GRADE, 'string'),
        placeholder: '请选择推荐年级',
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: 'ID',
      width: 80,
    },
    {
      field: 'categoryId',
      title: '分类ID',
      width: 100,
    },
    {
      field: 'grade',
      title: '推荐年级',
      width: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GRADE },
      },
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 160,
      formatter: 'formatDateTime',
    },
    {
      title: '操作',
      width: 160,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
