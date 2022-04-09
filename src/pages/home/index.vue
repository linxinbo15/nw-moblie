<template>
  <div>
    <t-search v-model="searchText" :clearable="true" placeholder="请输入关键字" @change="onChangeSearch"></t-search>
    <div class="grid-demo">
      <t-grid>
        <t-grid-item v-for="item in navList" :key="item.title" :text="item.title" :image="item.url" />
      </t-grid>
    </div>
    <div class="list-demo">
      <div
        id="monitorContainer"
        ref="monitorContainer"
        class="dashboard-chart-container"
        :style="{ width: '100%', height: `${resizeTime * 326}px` }"
      />
    </div>
  </div>
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

  echarts.use([TooltipComponent, LegendComponent, PieChart, GridComponent, LineChart, BarChart, CanvasRenderer]);

  export default defineComponent({
    name: 'Home',
    setup() {
      const images = [
        'https://mini.5irich.com/image/sw.png',
        'https://mini.5irich.com/image/sw1.png',
        'https://mini.5irich.com/image/sw2.png',
      ];
      const searchText = ref('');

      const onChangeSearch = (val: string) => {
        console.log('change: ', val);
      };

      const chartColors = ref({
        borderColor: "#dcdcdc",
        containerColor: "#fff",
        placeholderColor: "rgba(0, 0, 0, 0.35)",
        textColor: "rgba(0, 0, 0, 0.9)",
      })

      onMounted(async () => {
        renderMonitorChart();
        // getFundDescription();
        // console.log(loadDataTable.value.tacticsType);
      });

      // monitorChart
      let monitorContainer: HTMLElement;
      let monitorChart: echarts.ECharts;
      const renderMonitorChart = () => {
        if (!monitorContainer) {
          monitorContainer = document.getElementById('monitorContainer');
        }
        monitorChart = echarts.init(monitorContainer);
        monitorChart.setOption(getLineChartDataSet({ ...chartColors.value }));
      };

      const resizeTime = ref(1);

      return {
        images,
        navList,
        searchText,
        onChangeSearch,
        resizeTime,
        monitorContainer,
        renderMonitorChart,
      };
    },
  });
</script>

<style lang="less" scoped>
.grid-demo {
  margin: 8px 16px 8px;

  &.short-width {
    margin: 0 26px 8px;
  }
}
.list-demo {
  height: 900px;
  margin: 8px 16px 8px;
  background: #ffffff;
}
</style>