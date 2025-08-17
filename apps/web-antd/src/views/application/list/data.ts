import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { handleTree } from '@vben/utils';

import { z } from '#/adapter/form';
import { getClassificationList } from '#/api/application/classification';
import {
  CommonStatusEnum,
  DICT_TYPE,
  getDictOptions,
  getRangePickerDefaultProps,
} from '#/utils';

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
    // 隐藏字段：父分类ID、子分类ID（用于提交）
    {
      component: 'Input',
      fieldName: 'pcategoryId',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      component: 'Input',
      fieldName: 'ccategoryId',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      component: 'Input',
      fieldName: 'appName',
      label: '应用名称',
      rules: 'required',
    },
    {
      component: 'ApiTreeSelect',
      fieldName: 'categoryId',
      label: '应用分类',
      componentProps: {
        allowClear: true,
        api: async () => {
          const { list } = await getClassificationList();
          const tree = handleTree(list, 'id', 'pid', 'children');
          // 仅允许选择二级分类：禁用一级（pid === '0'）
          const markDisable = (nodes: any[]) => {
            nodes?.forEach((n) => {
              if (n.pid === '0') {
                n.disabled = true;
              }
              if (n.children && n.children.length > 0) {
                markDisable(n.children);
              }
            });
          };
          markDisable(tree);
          return tree;
        },
        labelField: 'appCategoryName',
        valueField: 'id',
        childrenField: 'children',
        placeholder: '请选择分类',
        treeDefaultExpandAll: true,
      },
      rules: 'required',
    },
    {
      fieldName: 'remark',
      component: 'Textarea',
      label: '应用介绍',
      componentProps: {
        minRows: 4,
        maxRows: 8,
      },
    },
    {
      component: 'CheckboxGroup',
      fieldName: 'tags',
      label: '标签',
      componentProps: {
        options: getDictOptions(DICT_TYPE.APPLICATION_LABEL, 'string'),
      },
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      fieldName: 'source',
      label: '来源',
      componentProps: {
        options: getDictOptions(DICT_TYPE.APPLICATION_SOURCE, 'string'),
      },
      rules: 'required',
    },
    {
      fieldName: 'appType',
      label: '应用交互',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '外部', value: 'web' },
          { label: '平台', value: 'platform' },
        ],
      },
      rules: 'required',
    },
    {
      fieldName: 'url',
      label: '应用URL',
      component: 'Input',
      componentProps: {
        placeholder: '请输入应用URL',
      },
      dependencies: {
        triggerFields: ['appType'],
        show: (values) => values.appType === 'web',
      },
      rules: 'required',
    },
    {
      fieldName: 'router',
      label: '应用路由',
      component: 'Input',
      componentProps: {
        placeholder: '请输入应用路由',
      },
      dependencies: {
        triggerFields: ['appType'],
        show: (values) => values.appType === 'platform',
      },
      rules: 'required',
    },
    {
      component: 'CheckboxGroup',
      fieldName: 'appGrade',
      label: '适用等级',
      componentProps: {
        options: getDictOptions(DICT_TYPE.GRADE, 'string'),
      },
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      fieldName: 'subjectName',
      label: '学科',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SUBJECT, 'string'),
      },
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      fieldName: 'packageFormat',
      label: '定价模式',
      componentProps: {
        options: getDictOptions(DICT_TYPE.PRICING_MODE, 'string'),
      },
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'price',
      label: '定价',
      componentProps: {
        min: 0,
      },
      dependencies: {
        triggerFields: ['packageFormat'],
        show: (values: any) => values.packageFormat !== 'free',
      },
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      fieldName: 'useVipFree',
      label: 'VIP是否免费',
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: '显示顺序',
      component: 'InputNumber',
      componentProps: {
        min: 0,
      },
      rules: 'required',
    },
    {
      fieldName: 'state',
      label: '应用状态',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.APPLICATION_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      component: 'RadioGroup',
      fieldName: 'useCarefully',
      label: '是否精选',
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      rules: 'required',
    },
    {
      fieldName: 'icon',
      label: '应用图标',
      component: 'Upload',
      componentProps: {
        accept: 'image/*',
        maxCount: 1,
        listType: 'picture-card',
        showUploadList: false,
        beforeUpload: (file: any) => {
          return file.size < 1024 * 1024 * 2;
        },
        // onChange: (info: any) => {
        //   console.log(info);
        // },
        // onRemove: (file: any) => {
        //   console.log(file);
        // },
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'createTime',
      label: '日期',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
      },
    },
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
    { type: 'checkbox', width: 40 },
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
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GRADE },
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
      field: 'createTime',
      title: '创建时间',
      formatter: 'formatDateTime',
    },
    {
      title: '操作',
      width: 130,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
