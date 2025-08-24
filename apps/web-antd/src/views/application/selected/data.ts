import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { handleTree } from '@vben/utils';

import { getClassificationList } from '#/api/application/classification';
import { DICT_TYPE, getDictOptions } from '#/utils';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: '应用名称',
      component: 'Input',
    },
    {
      fieldName: 'categoryId',
      label: '应用分类',
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const { list } = await getClassificationList();
          return handleTree(list, 'id', 'pid', 'children');
        },
        labelField: 'appCategoryName',
        valueField: 'id',
        childrenField: 'children',
        placeholder: '请选择分类',
        treeDefaultExpandAll: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: '序列号',
    },
    {
      field: 'appName',
      title: '应用名称',
    },
    {
      field: 'appCategoryName',
      title: '应用分类',
      formatter: (params) => {
        return `${params.row.pcategoryName || '-'} - ${params.row.ccategoryName || '-'}`;
      },
    },
    {
      field: 'source',
      title: '来源',
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.APPLICATION_SOURCE },
      },
    },
    {
      field: 'appGrade',
      title: '适用年级',
      formatter: (params) => {
        if (params.row.appGrade) {
          const grades = getDictOptions(DICT_TYPE.GRADE, 'string');
          const res = params.row.appGrade.map((item: string) => {
            return (
              grades.find((i) => i.value.toString() === item.toString())
                .label || '-'
            );
          });
          return res.join('、');
        } else {
          return '-';
        }
      },
    },
    {
      field: 'subjectName',
      title: '适用学科',
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SUBJECT },
      },
    },
    {
      field: 'packageFormat',
      title: '定价模式',
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.PRICING_MODE },
      },
    },
    {
      field: 'price',
      title: '定价',
    },
    {
      field: 'state',
      title: '状态',
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.APPLICATION_STATUS },
      },
    },
    {
      title: '操作',
      width: 80,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
