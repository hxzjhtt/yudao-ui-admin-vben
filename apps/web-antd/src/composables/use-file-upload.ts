import { useVbenModal } from '@vben/common-ui';

import FileUploadModal from '#/views/infra/file/modules/file-upload-modal.vue';

interface FileUploadOptions {
  directory?: string;
  maxCount?: number;
  accept?: string;
  mode?: 'backend' | 'presigned';
  onSuccess?: (files: any[]) => void;
}

export function useFileUpload() {
  const [UploadModal, uploadModalApi] = useVbenModal({
    connectedComponent: FileUploadModal,
    destroyOnClose: true,
  });

  function openUploadModal(options: FileUploadOptions = {}) {
    uploadModalApi
      .setData({
        directory: options.directory || 'uploadFiles',
        maxCount: options.maxCount || 0,
        accept: options.accept || '',
        mode: options.mode || 'presigned',
      })
      .open();

    if (options.onSuccess) {
      uploadModalApi.onConfirm((files: any[]) => {
        options.onSuccess?.(files);
      });
    }

    return uploadModalApi;
  }

  return {
    UploadModal,
    openUploadModal,
  };
}
