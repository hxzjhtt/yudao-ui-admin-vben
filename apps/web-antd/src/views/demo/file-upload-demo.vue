<script lang="ts" setup>
import { useFileUpload } from '#/composables/use-file-upload';

const { openUploadModal } = useFileUpload();

function handleUploadImages() {
  openUploadModal({
    directory: 'images',
    maxCount: 10,
    accept: 'image/*',
    onSuccess: (files) => {
      console.log('Images uploaded:', files);
    },
  });
}

function handleUploadDocuments() {
  openUploadModal({
    directory: 'documents',
    maxCount: 5,
    accept: '.pdf,.doc,.docx,.txt',
    mode: 'presigned',
    onSuccess: (files) => {
      console.log('Documents uploaded:', files);
    },
  });
}

function handleUnlimitedUpload() {
  openUploadModal({
    directory: 'uploadFiles',
    maxCount: 0, // 不限量
    accept: '', // 不限制类型
    mode: 'presigned',
    onSuccess: (files) => {
      console.log('Files uploaded:', files);
    },
  });
}
</script>

<template>
  <div class="space-y-4 p-4">
    <h2 class="text-xl font-bold">文件上传示例</h2>

    <div class="space-x-4">
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        @click="handleUploadImages"
      >
        上传图片 (最多10张)
      </button>

      <button
        class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        @click="handleUploadDocuments"
      >
        上传文档 (最多5个)
      </button>

      <button
        class="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        @click="handleUnlimitedUpload"
      >
        无限制上传
      </button>
    </div>
  </div>
</template>
