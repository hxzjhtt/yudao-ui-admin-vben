<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PodcastCategoryRecommend } from '#/api/boke/podcast-category-recommend';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deletePodcastCategoryRecommend,
  deletePodcastCategoryRecommendList,
  getPodcastCategoryRecommendPage,
} from '#/api/boke/podcast-category-recommend';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

function onRefresh() {
  gridApi.query();
}

function handleCreate() {
  formModalApi.setData(null).open();
}

function handleEdit(
  row: PodcastCategoryRecommend.PodcastCategoryRecommendInfo,
) {
  formModalApi.setData(row).open();
}

async function handleDelete(
  row: PodcastCategoryRecommend.PodcastCategoryRecommendInfo,
) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [`推荐ID: ${row.id}`]),
    key: 'action_key_msg',
  });
  try {
    await deletePodcastCategoryRecommend(row.id as string);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess', [`推荐ID: ${row.id}`]),
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
  records: PodcastCategoryRecommend.PodcastCategoryRecommendInfo[];
}) {
  checkedIds.value = records.map((item) => String(item.id ?? ''));
}

async function handleDeleteBatch() {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting'),
    duration: 0,
    key: 'action_process_msg',
  });
  try {
    await deletePodcastCategoryRecommendList(checkedIds.value);
    message.success($t('ui.actionMessage.deleteSuccess'));
    onRefresh();
  } finally {
    hideLoading();
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          const result = await getPodcastCategoryRecommendPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
          return result.data;
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
  } as VxeTableGridOptions<PodcastCategoryRecommend.PodcastCategoryRecommendInfo>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />
    <Grid table-title="播客分类推荐管理">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['播客分类推荐']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              onClick: handleCreate,
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
              label: $t('common.edit'),
              type: 'link',
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [
                  `推荐ID: ${row.id}`,
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
