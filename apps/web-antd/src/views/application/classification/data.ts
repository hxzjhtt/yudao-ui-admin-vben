import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ApplicationClassification } from '#/api/application/classification';

import { handleTree } from '@vben/utils';

import { getClassificationList } from '#/api/application/classification';

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
          const { list } = await getClassificationList();
          list.unshift({
            id: '0',
            appCategoryName: '顶级分类',
          });
          return handleTree(
            list.filter(
              (item: ApplicationClassification.Classification) =>
                item.pid === '0' || item.id === '0',
            ),
            'id',
            'pid',
            'children',
          );
        },
        labelField: 'appCategoryName',
        valueField: 'id',
        childrenField: 'children',
        placeholder: '请选择上级分类',
        treeDefaultExpandAll: true,
      },
      rules: 'selectRequired',
    },
    {
      fieldName: 'appCategoryName',
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
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<ApplicationClassification.Classification>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'appCategoryName',
      title: '分类名称',
      align: 'left',
      fixed: 'left',
      treeNode: true,
    },
    {
      field: 'sort',
      title: '排序',
    },
    {
      field: 'createTime',
      title: '创建时间',
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
