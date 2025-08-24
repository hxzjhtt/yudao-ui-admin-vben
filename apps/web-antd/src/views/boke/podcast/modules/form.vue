<script lang="ts" setup>
import type { Podcast } from '#/api/boke/podcast';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createPodcast, getPodcast, updatePodcast } from '#/api/boke/podcast';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<Podcast.PodcastInfo>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['播客'])
    : $t('ui.actionTitle.create', ['播客']);
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
      const values = (await formApi.getValues()) as Podcast.PodcastInfo;
      await (formData.value?.id
        ? updatePodcast(values)
        : createPodcast(values));
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
    const incoming = modalApi.getData<Podcast.PodcastInfo>();
    if (!incoming) return;
    if (!incoming.id) {
      return;
    }
    modalApi.lock();
    try {
      const detail = await getPodcast(incoming.id as string);
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
