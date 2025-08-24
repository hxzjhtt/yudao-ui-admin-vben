<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue/es/upload/interface';

import { reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
} from 'ant-design-vue';

import {
  createFile,
  getFilePresignedUrl,
  uploadFile,
} from '#/api/infra/file/file-upload';
import { baseRequestClient } from '#/api/request';
import { $t } from '#/locales';

interface UploadModalProps {
  directory?: string;
  maxCount?: number;
  accept?: string;
  mode?: 'backend' | 'presigned';
}

const emit = defineEmits(['confirm', 'success']);

const [Modal, modalApi] = useVbenModal({
  onConfirm: handleConfirm,
  onOpenChange: handleOpenChange,
});

const props = ref<UploadModalProps>({
  directory: 'uploadFiles',
  maxCount: 0,
  accept: '',
  mode: 'presigned',
});

const formState = reactive({
  directory: 'uploadFiles',
  maxCount: 0,
  accept: '',
  uploadMode: 'presigned' as 'backend' | 'presigned',
});

const fileList = ref<UploadFile[]>([]);
const uploading = ref(false);
const uploadProgress = ref(0);

function handleOpenChange(isOpen: boolean) {
  if (isOpen) {
    const data = modalApi.getData<UploadModalProps>() || {};
    props.value = { ...props.value, ...data };

    formState.directory = props.value.directory || 'uploadFiles';
    formState.maxCount = props.value.maxCount || 0;
    formState.accept = props.value.accept || '';
    formState.uploadMode = props.value.mode || 'presigned';

    fileList.value = [];
    uploadProgress.value = 0;
  }
}

async function handleConfirm() {
  if (fileList.value.length === 0) {
    message.error('请选择要上传的文件');
    return false;
  }

  uploading.value = true;
  const files = fileList.value
    .filter((file) => file.originFileObj)
    .map((file) => file.originFileObj as File);

  try {
    await processUpload(files);
    modalApi.close();
    emit('success');
    return true;
  } catch {
    message.error('上传失败');
    return false;
  } finally {
    uploading.value = false;
  }
}

async function processUpload(files: File[]) {
  const totalFiles = files.length;
  let completedFiles = 0;

  for (const file of files) {
    try {
      if (formState.uploadMode === 'backend') {
        // 模式1：后端上传
        await uploadFile(file, formState.directory);
      } else {
        // 模式2：预签名URL上传
        const presigned = await getFilePresignedUrl(
          file.name,
          formState.directory,
        );

        // 上传到预签名URL
        await baseRequestClient.put(presigned.data.uploadUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        });

        // 创建文件记录
        await createFile({
          configId: presigned.data.configId,
          path: presigned.data.path,
          name: file.name,
          url: presigned.data.url,
          type: file.type,
          size: file.size,
        });
      }

      completedFiles++;
      uploadProgress.value = (completedFiles / totalFiles) * 100;
    } catch (error) {
      console.error(`上传文件 ${file.name} 失败:`, error);
      message.error(`上传 ${file.name} 失败`);
      throw error;
    }
  }

  message.success(`成功上传 ${totalFiles} 个文件`);
}

function handleBeforeUpload(file: File) {
  if (formState.accept && !file.type.match(formState.accept)) {
    message.error(`文件类型不符合要求`);
    return false;
  }

  if (formState.maxCount > 0 && fileList.value.length >= formState.maxCount) {
    message.error(`最多只能上传 ${formState.maxCount} 个文件`);
    return false;
  }

  return true;
}

function handleFileChange(info: any) {
  fileList.value = info.fileList;
}

function handleRemove(file: UploadFile) {
  const index = fileList.value.findIndex((f) => f.uid === file.uid);
  if (index !== -1) {
    fileList.value.splice(index, 1);
  }
}

const acceptOptions = [
  { label: '不限制', value: '' },
  { label: '图片文件', value: 'image/*' },
  { label: '文档文件', value: '.doc,.docx,.pdf,.txt,.xls,.xlsx' },
  { label: '视频文件', value: 'video/*' },
  { label: '音频文件', value: 'audio/*' },
  { label: '压缩文件', value: '.zip,.rar,.7z,.tar,.gz' },
];

const uploadModeOptions = [
  { label: '后端上传', value: 'backend' },
  { label: '预签名上传', value: 'presigned' },
];
</script>

<template>
  <Modal
    :title="$t('common.upload')"
    :width="600"
    :mask-closable="false"
    :confirm-loading="uploading"
  >
    <div class="space-y-4">
      <Form layout="vertical" :model="formState">
        <Form.Item label="上传模式" name="uploadMode">
          <Select
            v-model:value="formState.uploadMode"
            :options="uploadModeOptions"
          />
        </Form.Item>

        <Form.Item label="文件目录" name="directory">
          <Input
            v-model:value="formState.directory"
            placeholder="请输入文件目录"
          />
        </Form.Item>

        <Form.Item label="文件类型限制" name="accept">
          <Select v-model:value="formState.accept" :options="acceptOptions" />
        </Form.Item>

        <Form.Item label="最大文件数量" name="maxCount">
          <InputNumber
            v-model:value="formState.maxCount"
            :min="0"
            :max="100"
            placeholder="0表示不限量"
            style="width: 100%"
          />
        </Form.Item>
      </Form>

      <Upload.Dragger
        v-model:file-list="fileList"
        :before-upload="handleBeforeUpload"
        :accept="formState.accept"
        :max-count="formState.maxCount"
        :multiple="formState.maxCount !== 1"
        :directory="false"
        :show-upload-list="true"
        :remove="handleRemove"
        @change="handleFileChange"
      >
        <p class="ant-upload-drag-icon">
          <span class="icon-[ant-design--inbox-outlined] text-3xl"></span>
        </p>
        <p class="ant-upload-text">点击或拖拽文件到此处上传</p>
        <p class="ant-upload-hint">
          <template v-if="formState.accept">
            支持文件类型：{{
              acceptOptions.find((opt) => opt.value === formState.accept)?.label
            }}
          </template>
          <template v-else> 支持任意类型文件 </template>
          <br />
          <template v-if="formState.maxCount > 0">
            最多上传 {{ formState.maxCount }} 个文件
          </template>
          <template v-else> 不限文件数量 </template>
        </p>
      </Upload.Dragger>

      <div v-if="uploading" class="mt-4">
        <div class="mb-2 text-sm text-gray-600">
          上传进度：{{ Math.round(uploadProgress) }}%
        </div>
        <div class="h-2 w-full rounded-full bg-gray-200">
          <div
            class="h-2 rounded-full bg-blue-600 transition-all duration-300"
            :style="{ width: `${uploadProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </Modal>
</template>
