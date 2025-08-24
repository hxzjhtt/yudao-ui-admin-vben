<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { FileUpload } from '#/api/infra/file/file-upload';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { isEmpty, openWindow } from '@vben/utils';

import { useClipboard } from '@vueuse/core';
import { Button, Dropdown, Image, Menu, message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createFile,
  deleteFile,
  deleteFileList,
  getFilePage,
  getFilePresignedUrl,
  uploadFile,
} from '#/api/infra/file/file-upload';
import { baseRequestClient } from '#/api/request';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import FileUploadModal from './modules/file-upload-modal.vue';

const [UploadModal, uploadModalApi] = useVbenModal({
  connectedComponent: FileUploadModal,
  destroyOnClose: true,
});

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: () => import('./modules/form.vue'),
  destroyOnClose: true,
});

const uploadMode = ref<'backend' | 'presigned'>('backend');
const fileList = ref<any[]>([]);
const uploading = ref(false);

/** 刷新表格 */
function onRefresh() {
  gridApi.query();
}

/** 上传文件 - 选择模式 */
function handleUpload(mode: 'backend' | 'presigned') {
  if (mode === 'presigned') {
    uploadModalApi
      .setData({
        directory: 'uploadFiles',
        maxCount: 0, // 不限量
        accept: '', // 不限制文件类型
      })
      .open();
  } else {
    formModalApi.setData(null).open();
  }
}

/** 处理批量上传 */
async function handleBatchUpload(fileList: File[]) {
  try {
    uploading.value = true;
    const results = [];

    for (const file of fileList) {
      if (uploadMode.value === 'backend') {
        // 模式1：后端上传
        const result = await uploadFile(file, 'uploadFiles');
        results.push(result);
      } else {
        // 模式2：预签名URL上传
        const presigned = await getFilePresignedUrl(file.name, 'uploadFiles');

        // 上传到预签名URL
        await baseRequestClient.put(presigned.data.uploadUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        });

        // 创建文件记录
        const fileRecord = await createFile({
          configId: presigned.data.configId,
          path: presigned.data.path,
          name: file.name,
          url: presigned.data.url,
          type: file.type,
          size: file.size,
        });

        results.push(fileRecord);
      }
    }

    message.success(`成功上传 ${results.length} 个文件`);
    onRefresh();
  } catch {
    message.error('上传失败');
  } finally {
    uploading.value = false;
  }
}

/** 复制链接到剪贴板 */
const { copy } = useClipboard({ legacy: true });
async function handleCopyUrl(row: FileUpload.FileRespVO) {
  if (!row.url) {
    message.error('文件 URL 为空');
    return;
  }

  try {
    await copy(row.url);
    message.success('复制成功');
  } catch {
    message.error('复制失败');
  }
}

/** 删除文件 */
async function handleDelete(row: FileUpload.FileRespVO) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name || row.path]),
    duration: 0,
    key: 'action_process_msg',
  });
  try {
    await deleteFile(row.id);
    message.success(
      $t('ui.actionMessage.deleteSuccess', [row.name || row.path]),
    );
    onRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({
  records,
}: {
  records: FileUpload.FileRespVO[];
}) {
  checkedIds.value = records.map((item) => item.id);
}

/** 批量删除文件 */
async function handleDeleteBatch() {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting'),
    duration: 0,
    key: 'action_process_msg',
  });
  try {
    await deleteFileList(checkedIds.value);
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
          return await getFilePage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
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
  } as VxeTableGridOptions<FileUpload.FileRespVO>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});

// 处理上传模态框的确认事件
function handleUploadConfirm(files: File[]) {
  handleBatchUpload(files);
}
</script>

<template>
  <Page auto-content-height>
    <UploadModal @success="onRefresh" @confirm="handleUploadConfirm" />
    <FormModal @success="onRefresh" />
    <Grid table-title="文件列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: '上传文件',
              type: 'primary',
              icon: ACTION_ICON.UPLOAD,
              auth: ['infra:file:create'],
              onClick: () => handleUpload('backend'),
            },
            {
              label: '预签名上传',
              type: 'primary',
              icon: ACTION_ICON.UPLOAD,
              auth: ['infra:file:create'],
              onClick: () => handleUpload('presigned'),
            },
            {
              label: '批量删除',
              type: 'primary',
              danger: true,
              disabled: isEmpty(checkedIds),
              icon: ACTION_ICON.DELETE,
              auth: ['infra:file:delete'],
              onClick: handleDeleteBatch,
            },
          ]"
        />
        <Dropdown class="ml-2">
          <template #overlay>
            <Menu>
              <Menu.Item key="backend" @click="() => (uploadMode = 'backend')">
                后端上传模式
              </Menu.Item>
              <Menu.Item
                key="presigned"
                @click="() => (uploadMode = 'presigned')"
              >
                预签名上传模式
              </Menu.Item>
            </Menu>
          </template>
          <Button>
            {{ uploadMode === 'backend' ? '后端上传模式' : '预签名上传模式' }}
            <span class="icon-[ant-design--down-outlined] ml-1"></span>
          </Button>
        </Dropdown>
      </template>
      <template #file-content="{ row }">
        <Image v-if="row.type && row.type.includes('image')" :src="row.url" />
        <Button v-else type="link" @click="() => openWindow(row.url)">
          {{ row.type && row.type.includes('pdf') ? '预览' : '下载' }}
        </Button>
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '复制链接',
              type: 'link',
              icon: ACTION_ICON.COPY,
              onClick: handleCopyUrl.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              auth: ['infra:file:delete'],
              icon: ACTION_ICON.DELETE,
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.name]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
