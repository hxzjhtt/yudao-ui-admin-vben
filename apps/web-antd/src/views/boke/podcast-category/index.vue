<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PodcastCategory } from '#/api/boke/podcast-category';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deletePodcastCategory,
  deletePodcastCategoryList,
  getPodcastCategoryPage,
} from '#/api/boke/podcast-category';
import { $t } from '#/locales';

import { useGridColumns } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** 刷新表格 */
function onRefresh() {
  gridApi.query();
}

/** 切换树形展开/收缩状态 */
const isExpanded = ref(true);
function toggleExpand() {
  isExpanded.value = !isExpanded.value;
  gridApi.grid.setAllTreeExpand(isExpanded.value);
}

/** 创建 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 添加下级 */
function handleAppend(row: PodcastCategory.PodcastCategoryInfo) {
  formModalApi.setData({ pid: row.id }).open();
}

/** 编辑 */
function handleEdit(row: PodcastCategory.PodcastCategoryInfo) {
  formModalApi.setData(row).open();
}

/** 删除 */
async function handleDelete(row: PodcastCategory.PodcastCategoryInfo) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.podcastCategoryName]),
    key: 'action_key_msg',
  });
  try {
    await deletePodcastCategory(row.id as string);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess', [row.podcastCategoryName]),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<string[]>([]);
function handleRowCheckboxChange({
  records,
}: {
  records: PodcastCategory.PodcastCategoryInfo[];
}) {
  checkedIds.value = records.map((item) => item.id as string);
}

/** 批量删除 */
async function handleDeleteBatch() {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting'),
    duration: 0,
    key: 'action_process_msg',
  });
  try {
    await deletePodcastCategoryList(checkedIds.value);
    message.success($t('ui.actionMessage.deleteSuccess'));
    onRefresh();
  } finally {
    hideLoading();
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async () => {
          const { data } = await getPodcastCategoryPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list || [];
        },
      },
    },
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
    treeConfig: {
      transform: true,
      rowField: 'id',
      parentField: 'pid',
      expandAll: true,
      accordion: false,
    },
  } as VxeTableGridOptions<PodcastCategory.PodcastCategoryInfo>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});

/** 初始化 */
onMounted(async () => {});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />
    <Grid table-title="播客分类管理">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['分类']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              onClick: handleCreate,
            },
            {
              label: isExpanded ? '收缩' : '展开',
              type: 'primary',
              onClick: toggleExpand,
            },
            {
              label: '批量删除',
              type: 'primary',
              danger: true,
              disabled: isEmpty(checkedIds),
              icon: ACTION_ICON.DELETE,
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '新增下级',
              type: 'link',
              icon: ACTION_ICON.ADD,
              ifShow: row.pid === '0',
              onClick: handleAppend.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: !!(row.children && row.children.length > 0),
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [
                  row.podcastCategoryName,
                ]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
