<script lang="ts" setup>
import type { PodcastCategoryRecommend } from '#/api/boke/podcast-category-recommend';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createPodcastCategoryRecommend,
  getPodcastCategoryRecommend,
  updatePodcastCategoryRecommend,
} from '#/api/boke/podcast-category-recommend';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<PodcastCategoryRecommend.PodcastCategoryRecommendInfo>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['播客分类推荐'])
    : $t('ui.actionTitle.create', ['播客分类推荐']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 100,
  },
  layout: 'horizontal',
  schema: useFormSchema(),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    try {
      const values =
        (await formApi.getValues()) as PodcastCategoryRecommend.PodcastCategoryRecommendInfo;
      await (formData.value?.id
        ? updatePodcastCategoryRecommend(values)
        : createPodcastCategoryRecommend(values));
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    const incoming =
      modalApi.getData<PodcastCategoryRecommend.PodcastCategoryRecommendInfo>();
    if (!incoming) return;
    if (!incoming.id) {
      return;
    }
    modalApi.lock();
    try {
      const detail = await getPodcastCategoryRecommend(incoming.id as string);
      formData.value = detail.data;
      await formApi.setValues(detail.data);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal class="w-2/5" :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
