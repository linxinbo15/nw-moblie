<template>
    <div class="container">
        <router-view />
    </div>
    <t-tab-bar ref="tabbarRef" v-model="value" class="mt-12" @change="change">      
        <t-tab-bar-item v-for="(item, i) in main" :key="item.path || i" :icon="item.meta?.icon" :name="item.name">
        {{ item.meta?.title }}
        </t-tab-bar-item>
    </t-tab-bar>
</template>
<script lang="ts">
import { defineComponent, ref, watch, h, nextTick } from 'vue';
import { main } from '@/router/modules/tabBar';

export default defineComponent({
  setup() {
    const value = ref(0);
    
    // 获取dom节点
    const tabbarRef = ref(null);
    const containerHeight = ref('');
    console.log(tabbarRef);

    nextTick(() => {
      // 获取dom节点 高度
      containerHeight.value = tabbarRef.value?.$el.offsetHeight + 'px';
    });

    watch(value, (newValue) => {
      console.log('当前值：', newValue);
    });

    const change = (changeValue: number | string) => {
      console.log('TabBar 值改变为：', changeValue);
    };

    return {
      value,
      change,
      main,
      tabbarRef,
      containerHeight,
    };
  },
});
</script>
<style lang="less">
  .container {
    --height: v-bind('containerHeight');
    --container-height: calc(100vh - var(--height));

    height: calc(100vh - var(--height));
    overflow: auto;
  }
</style>
