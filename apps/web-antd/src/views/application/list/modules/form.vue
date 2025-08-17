<script lang="ts" setup>
import type { ApplicationList } from '#/api/application/list';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getClassificationList } from '#/api/application/classification';
import {
  createApplication,
  getApplication,
  updateApplication,
} from '#/api/application/list';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<ApplicationList.Application>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['应用'])
    : $t('ui.actionTitle.create', ['应用']);
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
    // 提交表单
    const values = (await formApi.getValues()) as Record<string, any>;
    // 计算父子分类ID：仅允许选择二级，ccategoryId=所选ID，pcategoryId=其父ID
    if (values.categoryId) {
      try {
        const { list } = await getClassificationList();
        const selected = list.find((it: any) => it.id === values.categoryId);
        values.ccategoryId = values.categoryId;
        values.pcategoryId = selected?.pid ?? undefined;
        // 同步主分类字段
        values.appCategoryId = values.ccategoryId;
      } catch {
        // 忽略分类计算错误，避免阻塞提交
      }
    }
    const data = values as ApplicationList.Application & {
      ccategoryId?: string;
      pcategoryId?: string;
    };
    try {
      await (formData.value?.id
        ? updateApplication(data)
        : createApplication(data));
      // 关闭并提示
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
    // 加载数据
    const incoming = modalApi.getData<ApplicationList.Application>();
    if (!incoming) return;
    if (!incoming.id) {
      // 新建
      return;
    }
    modalApi.lock();
    try {
      const detail = await getApplication(incoming.id as string);
      formData.value = detail;
      const values: Record<string, any> = { ...detail };
      // 回显分类：优先使用后端 ccategoryId，否则使用 appCategoryId
      if ((detail as any).ccategoryId) {
        values.categoryId = (detail as any).ccategoryId;
      } else if (detail.appCategoryId) {
        values.categoryId = detail.appCategoryId as any;
      }
      await formApi.setValues(values);
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
