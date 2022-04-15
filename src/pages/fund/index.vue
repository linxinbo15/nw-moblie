<template>
  <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
    <t-list :async-loading="loading" @scroll="onScroll">
      <t-cell v-for="item in list" :key="item" align="middle">
        <span class="cell">{{ item }}</span>
      </t-cell>
    </t-list>
  </t-pull-down-refresh>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { navList } from './navList';
  import { Toast } from 'tdesign-mobile-vue';
  import * as echarts from 'echarts/core';
  import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
  import { PieChart, LineChart, BarChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import { getLineChartDataSet } from './index';
  import { UrlEnum } from '@/utils/httpEnum';
  import { ChevronRightIcon } from 'tdesign-icons-vue-next';

  echarts.use([TooltipComponent, LegendComponent, PieChart, GridComponent, LineChart, BarChart, CanvasRenderer]);

  export default defineComponent({
    name: 'FundList',
    components: { ChevronRightIcon },
    setup() {
      const list = ref([] as Array<any>);
      const loading = ref(false);
      const refreshing = ref(true);

      const onLoad = (isRefresh?: boolean) => {
        console.log(isRefresh);
        if (list.value.length >= 80 || loading.value) {
          return;
        }
        // loading.value = true;
        setTimeout(() => {
          const temp = [];
          for (let i = 0; i < 20; i++) {
            if (isRefresh) {
              temp.push(`${i + 1}`);
            } else {
              temp.push(`${list.value.length + 1}`);
            }
          }
          if (isRefresh) {
            list.value = temp;
          } else {
            list.value.push(...temp);
          }
          loading.value = false;
          refreshing.value = false;
        }, 1000);
      };

      const onScroll = () => {
        console.log(1);
      };

      const onRefresh = () => {
        refreshing.value = true;
        onLoad(true);
      };

      onMounted(() => {
        onLoad(true);
      });

      return {
        list,
        loading,
        refreshing,
        onLoad,
        onScroll,
        onRefresh,
      };
    },
  });
</script>

<style lang="less" scoped>
@import '@/style/variables.less';
</style>