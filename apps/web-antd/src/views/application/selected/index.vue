<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ApplicationList } from '#/api/application/list';

import { Page } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { getApplicationList, updateApplication } from '#/api/application/list';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';

/** 刷新表格 */
function onRefresh() {
  gridApi.query();
}

/** 取消设为精选 */
async function handleUnSelected(row: ApplicationList.Application) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.appName]),
    key: 'action_key_msg',
  });
  try {
    await updateApplication({
      ...row,
      useCarefully: false,
    });
    message.success({
      content: '取消精选成功',
      key: 'action_key_msg',
    });
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
          return await getApplicationList({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
            useCarefully: true,
          });
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
  } as VxeTableGridOptions<ApplicationList.Application>,
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />
    <Grid table-title="应用列表">
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '取消精选',
              type: 'link',
              auth: ['application:list:update'],
              ifShow: row.useCarefully === true,
              popConfirm: {
                title: '确定将该应用取消精选吗？',
                confirm: handleUnSelected.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
