<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message, Upload } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { uploadFile } from '#/api/infra/file/file-upload';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const uploadMode = ref<'backend' | 'presigned'>('backend');
const formState = reactive({
  file: null as File | null,
  directory: 'uploadFiles',
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
  },
  layout: 'vertical',
  schema: [
    {
      fieldName: 'uploadMode',
      label: '上传模式',
      component: 'Select',
      defaultValue: 'backend',
      componentProps: {
        options: [
          { label: '后端上传', value: 'backend' },
          { label: '预签名上传', value: 'presigned' },
        ],
      },
    },
    {
      fieldName: 'directory',
      label: '文件目录',
      component: 'Input',
      defaultValue: 'uploadFiles',
      componentProps: {
        placeholder: '请输入文件目录',
      },
      rules: 'required',
    },
    {
      fieldName: 'file',
      label: '选择文件',
      component: 'Upload',
      rules: 'required',
      componentProps: {
        placeholder: '请选择要上传的文件',
        accept: '',
        maxCount: 1,
        beforeUpload: (file: File) => {
          formState.file = file;
          return false; // 阻止自动上传
        },
        onRemove: () => {
          formState.file = null;
        },
      },
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid || !formState.file) {
      return;
    }

    modalApi.lock();
    try {
      // 根据选择的上传模式进行处理
      if (uploadMode.value === 'backend') {
        await uploadFile(formState.file, formState.directory);
      } else {
        // 预签名上传模式，跳转到批量上传模态框
        modalApi.close();
        // 这里可以触发打开批量上传模态框
        return;
      }

      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
});

function handleUploadModeChange(mode: 'backend' | 'presigned') {
  uploadMode.value = mode;
}
</script>

<template>
  <Modal title="上传文件">
    <Form class="mx-4" :model="formState">
      <template #uploadMode="{ field, value, onChange }">
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium">上传模式</label>
          <select
            :value="value"
            @change="
              (e) => {
                const value = e.target.value as 'backend' | 'presigned';
                onChange(value);
                handleUploadModeChange(value);
              }
            "
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="backend">后端上传 (单文件)</option>
            <option value="presigned">预签名上传 (多文件)</option>
          </select>
        </div>
      </template>

      <template #file>
        <div class="w-full">
          <Upload.Dragger
            name="file"
            :max-count="1"
            :before-upload="
              (file) => {
                formState.file = file;
                return false;
              }
            "
            :show-upload-list="true"
            :file-list="formState.file ? [formState.file] : []"
            @remove="
              () => {
                formState.file = null;
              }
            "
          >
            <p class="ant-upload-drag-icon">
              <span class="icon-[ant-design--inbox-outlined] text-2xl"></span>
            </p>
            <p class="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p class="ant-upload-hint">支持任意类型文件</p>
          </Upload.Dragger>
        </div>
      </template>
    </Form>
  </Modal>
</template>
