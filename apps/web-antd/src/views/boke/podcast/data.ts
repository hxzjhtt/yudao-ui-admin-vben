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
      component: 'Input',
      fieldName: 'podcastName',
      label: '播客名称',
      rules: 'required',
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
    {
      component: 'Select',
      fieldName: 'subject',
      label: '学科',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SUBJECT, 'string'),
        placeholder: '请选择学科',
      },
      rules: 'required',
    },
    {
      fieldName: 'remark',
      component: 'Textarea',
      label: '播客介绍',
      componentProps: {
        minRows: 4,
        maxRows: 8,
        placeholder: '请输入播客介绍',
      },
    },
    {
      fieldName: 'icon',
      label: '播客图标',
      component: 'Upload',
      componentProps: {
        accept: 'image/*',
        maxCount: 1,
        listType: 'picture-card',
        showUploadList: false,
        customRequest: async (options: any) => {
          const { file, onSuccess, onError } = options;
          try {
            const { uploadFile } = await import('#/api/infra/file/file-upload');
            const result = await uploadFile(file, 'podcast-icons');
            onSuccess({ url: result || result }, file);
          } catch (error) {
            onError(error);
          }
        },
      },
    },
    {
      fieldName: 'background',
      label: '背景图片',
      component: 'Upload',
      componentProps: {
        accept: 'image/*',
        maxCount: 1,
        listType: 'picture-card',
        showUploadList: false,
        customRequest: async (options: any) => {
          const { file, onSuccess, onError } = options;
          try {
            const { uploadFile } = await import('#/api/infra/file/file-upload');
            const result = await uploadFile(file, 'podcast-backgrounds');
            onSuccess({ url: result || result }, file);
          } catch (error) {
            onError(error);
          }
        },
      },
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
      fieldName: 'podcastName',
      label: '播客名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入播客名称',
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
    {
      component: 'Select',
      fieldName: 'subject',
      label: '学科',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.SUBJECT, 'string'),
        placeholder: '请选择学科',
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
      field: 'podcastName',
      title: '播客名称',
      width: 150,
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
      field: 'subject',
      title: '学科',
      width: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SUBJECT },
      },
    },
    {
      field: 'remark',
      title: '介绍',
      width: 200,
      showOverflow: 'tooltip',
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 160,
      formatter: 'formatDateTime',
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
