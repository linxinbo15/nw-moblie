<template>
  <div>
    <t-search v-model="searchText" :clearable="true" placeholder="基金名称/代码/基金经理/基金公司" @change="onChangeSearch"></t-search>
    <div class="swiper">
      <t-swiper :navigation="{ type: 'fraction', showSlideBtn: false }">
        <t-swiper-item class="swiper-item--demo" v-for="item in images" :key="item">
          <img :src="item" class="img" />
        </t-swiper-item>
      </t-swiper>
    </div>    
    <div class="grid-demo">
      <div class="t-grid">
        <div class="t-grid-item" v-for="item in menuList" :key="item.title">
          <div class="t-grid-item__image-box">
            <t-image class="image-container" :src="item.url" fit="fill"></t-image>
          </div>
          <div class="t-grid-item__text">
            <div class="t-grid-item__title" style="margin-bottom: 4px;">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="t-new">
      <div class="t-new-box">
        <t-image class="image-new" :src="jryw" fit="fill"></t-image>
      </div>
      <div class="t-new-box">
        <t-image class="image-new" :src="ssjb" fit="fill"></t-image>
      </div>
    </div>
    <div class="list-demo">
      <div class="list-demo-title flex-between">
        <div class="list-demo-title-mian">基金榜单</div>
        <div class="list-demo-title-right flex-center">
          更多<ChevronRightIcon />
        </div>
      </div>
      <div class="list-demo-content">
        <t-tabs default-value="first" @on-change="onChange">
          <t-tab-panel v-for="(item, index) in tabPanels" :key="index" :value="item.value" :label="item.label">
          </t-tab-panel>
        </t-tabs>
        <div class="list-box">
          <div class="fund-list-title flex-start">
            <div class="fund-list-title-left">基金名称</div>
            <div class="fund-list-title-right">近一年</div>
          </div>
          <div class="fund-list-title flex-center" style="padding:12px 0;">
            <div class="fund-list-title-left">
              <div class="fund-name">前海开源公用事业</div>
              <div class="fund-code">056522</div>
            </div>
            <div class="fund-list-title-right">
              <div class="increase up">+63.67%</div>
              <div class="date">04-12</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="list-demo">
      <div class="investm">
        <t-image class="image-new" :src="tzgd" fit="fill"></t-image>
        <div class="investm-box">          
          <div class="investm-header flex-start">
            <t-image class="content-icon" :src="tzgdIcon1" fit="fill"></t-image>
            <div style="margin-left:5px;">投资观点</div>
          </div>
          <div class="investm-full flex-start">
            <t-image class="investm-icon" :src="gd" fit="fill"></t-image>
            <div class="investm-full-t">
              <div class="new-title flex-start">创金投研部大类资产配置观点 <t-image class="new-icon" :src="newicon" fit="fill"></t-image></div>
              <div class="new-date">2022–04-07</div>
            </div>
          </div>
        </div>
        <div class="investm-content flex-center">
          <div class="investm-content-item flex1 flex-center">
            <t-image class="content-icon" :src="tzgdIcon" fit="fill"></t-image>
            <div class="content-title">投资观点</div>
          </div>
          <div class="investm-content-item flex1 flex-center">
            <t-image class="content-icon" :src="dqfpIcon" fit="fill"></t-image>
            <div class="content-title">定期复盘</div>
          </div>
        </div>       
      </div>
    </div>

    <div class="list-demo">
      <div class="list-demo-title flex-between">
        <div class="list-demo-title-mian">基金学堂</div>
        <div class="list-demo-title-right flex-center">
          更多<ChevronRightIcon />
        </div>
      </div>
      <div class="training-box">
        <div class="flex-center">
          <div class="training-item">
            <t-image :src="stu1" fit="fill"></t-image>
            <div class="training-title">专业管理是获得长期受益 的基石</div>
          </div>
          <div class="training-item">
            <t-image :src="stu2" fit="fill"></t-image>
            <div class="training-title">让年化收益率更稳定的秘 密（上）</div>
          </div>
        </div>
        <div class="tarining-item1 flex-start">
          <t-image class="training-img" :src="hot1" fit="fill"></t-image>
          <div style="margin-left:10px;">
            <div class="training-title">封闭期和稳健理财解读</div>
            <div class="training-date">2020-04-07</div>
          </div>
        </div>
        <div class="tarining-item1 flex-start">
          <t-image class="training-img" :src="hot2" fit="fill"></t-image>
          <div style="margin-left:10px;">
            <div class="training-title">1分钟GET基金定投</div>
            <div class="training-date">2020-04-07</div>
          </div>
        </div>
        <div class="tarining-item1 flex-start">
          <t-image class="training-img" :src="hot3" fit="fill"></t-image>
          <div style="margin-left:10px;">
            <div class="training-title">定投止盈全策略，找到卖点</div>
            <div class="training-date">2020-04-07</div>
          </div>
        </div>
        
      </div>
    </div>

    <div
      id="monitorContainer"
      ref="monitorContainer"
      class="dashboard-chart-container"
      :style="{ width: '100%', height: `${resizeTime * 326}px` }"
    />
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
  import { UrlEnum } from '@/utils/httpEnum';
  import { ChevronRightIcon } from 'tdesign-icons-vue-next';

  echarts.use([TooltipComponent, LegendComponent, PieChart, GridComponent, LineChart, BarChart, CanvasRenderer]);

  export default defineComponent({
    name: 'FundDetail',
    components: { ChevronRightIcon },
    setup() {
      const images = [
        UrlEnum.PICURL + 'banner.png',
        UrlEnum.PICURL + 'banner.png',
        UrlEnum.PICURL + 'banner.png',
      ];
      // 静态图片地址
      const jryw = ref(UrlEnum.PICURL + 'jryw.png');
      const ssjb = ref(UrlEnum.PICURL + 'ssjb.png');
      const tzgd = ref(UrlEnum.PICURL + 'tzgd-bg.png');
      const gd = ref(UrlEnum.PICURL + 'gd.png');
      const searchText = ref('');
      const newicon = ref(UrlEnum.PICURL + 'new.png');
      const tzgdIcon = ref(UrlEnum.PICURL + 'tzgd_icon.png');
      const dqfpIcon = ref(UrlEnum.PICURL + 'dqfp.png');
      const stu1 = ref(UrlEnum.PICURL + 'stu1.png');
      const stu2 = ref(UrlEnum.PICURL + 'stu2.png');
      const hot1 = ref(UrlEnum.PICURL + 'hotimg.png');
      const hot2 = ref(UrlEnum.PICURL + 'hotimg1.png');
      const hot3 = ref(UrlEnum.PICURL + 'hotimg2.png');
      const tzgdIcon1 = ref(UrlEnum.PICURL + 'tzgd-icon1.png');

      const onChangeSearch = (val: string) => {
        console.log('change: ', val);
      };

      const onChange = ($event: number) => {
        console.log(`change to ${$event}`);
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
      const menuList = ref(navList);
      const tabPanels =ref([
        {
          value: 'first',
          panel: '收益榜内容',
          label: '收益榜',
        },
        {
          value: 'second',
          panel: '稳健榜内容',
          label: '稳健榜',
        },
        {
          value: 'third',
          panel: '抗跌榜内容',
          label: '抗跌榜',
        },
      ]);

      return {
        images,
        menuList,
        searchText,
        onChangeSearch,
        resizeTime,
        monitorContainer,
        renderMonitorChart,
        jryw,
        ssjb,
        onChange,
        tabPanels,
        tzgd,
        gd,
        newicon,
        tzgdIcon,
        tzgdIcon1,
        dqfpIcon,
        stu1,
        stu2,
        hot1,
        hot2,
        hot3,
      };
    },
  });
</script>

<style lang="less" scoped>
@import '@/style/variables.less';
.grid-demo {
  padding: 0 16px;
  background-color: @bg-white;

  &.short-width {
    margin: 0 26px 8px;
  }
}
.swiper {
  padding: 0 16px;
  background-color: @bg-white;
}
.t-swiper {
  overflow: hidden;
}
.swiper-item--demo {
  img {
    width: 100%;
  }
}

.t-grid {

  .t-grid-item {
    flex-basis: 25%;
    flex-direction: column;
    padding-left: 0px;
    padding-right: 0px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
.t-new {
  display: flex;
  width: 100%;
  padding: 0 16px 16px 16px;
  background-color: @bg-white;
  .t-new-box {
    flex-basis: 50%;
    flex-direction: column;
    padding-left: 0px;
    padding-right: 0px;
    align-items: center;
    justify-content: center;
    text-align: center;

    .image-new {
      display: block;
      width: 100%;
    }
  }
  .t-new-box + .t-new-box {
    flex-basis: 50%;
    flex-direction: column;
    padding-left: 0px;
    padding-right: 0px;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-left: @margin-left-15;

    .image-new {
      width: 100%;
    }
  }
}

.image-container {
  width: 100%;
  height: 32px;
}
.t-grid-item__image {
  width: 100%;
  height: 100%;
}
.list-demo {
  margin: 8px 16px 16px;

  .training-box {
    border-radius: @border-radius;
    background-color: @bg-white;
    padding: 10px;
  }

  .training-item {
    flex: 1;
    text-align: center;
  }

  .training-item + .training-item {
    flex: 1;
    text-align: center;
    margin-left: 10px;
  }

  .training-title {
    font-size: @font-size-base;
    color: @text-color-primary;
  }

  .training-date {
    font-size: @font-size-s;
    color: @text-color-secondary;
  }

  .tarining-item1 {
    padding: 15px 0;
    border-bottom: 1px solid @border-level-1-color;

    .training-img {
      display: block;
      width: 100px;
    }
  }
  

  .list-demo-title {
    padding: 8px 0;

    .list-demo-title-mian {
      font-size: @font-size-l;
      color: @text-color-primary;
    }

    .list-demo-title-right {
      font-size: @font-size-s;
      color: @text-color-secondary;
    }
  }

  .list-demo-content {
    border-radius: @border-radius;
    background-color: @bg-white;
  }

  .list-box {
    padding: 0 14px;

    .fund-list-title {
      padding: 8px 0;
      border-bottom: 1px solid @border-level-1-color;

      .fund-list-title-left {
        flex: 66.66%;
        font-size: @font-size-s;
        color: @text-color-placeholder;

        .fund-name {
          font-size: @font-size-l;
          color: @text-color-primary;
        }

        .fund-code {
          font-size: @font-size-s;
          color: @text-color-placeholder;
        }
      }

      .fund-list-title-right {
        flex: 33.33%;
        font-size: @font-size-s;
        color: @text-color-placeholder;
        text-align: center;

        .increase {
          font-size: @font-size-l;
        }

        .up {
          color: @red;
        }

        .down {
          color: @green;
        }

        .date {
          font-size: @font-size-s;
          color: @text-color-placeholder;
        }
      }
    }
  }

  .investm {
    position: relative;
    z-index: 10;

    .image-new {
      display: block;
      height: 80px;
      width: 100%;
    }

    .investm-box {
      position: absolute;
      padding: 10px;
      top: 8px;
      left: 0;
      right: 0;
      z-index: 15;

      .investm-header {
        position: relative;
        font-size: @font-size-l;
        color: @text-color-anti;
        
        .content-icon {
          display: block;
          height: 24px;
        }
      }

      .investm-full {
        position: relative;
        background-color: @bg-white;
        box-shadow: @shadow-home;
        margin-top: 15px;
        border-radius: @border-radius;
        padding: 10px;

        .investm-icon {
          height: 34px;
        }

        .investm-full-t {
          margin-left: 10px;

          .new-title {
            font-size: @font-size-l;
            color: @text-color-primary;

            .new-icon {
              height: 15px;
              margin-left: 5px;
            }
          }

          .new-date {
            font-size: @font-size-s;
            color: @text-color-placeholder;
          }
        }
      }
    }
    
    .investm-content {
      position: relative;
      background-color: @bg-white;
      border-radius: 0 0 @border-radius @border-radius;
      padding: 55px 10px 15px 10px;

      .investm-content-item {
        background-color: @bg-color;
        padding: 12px;

        .content-icon {
          display: block;
          height: 24px;
        }

        .content-title {
          margin-left: 5px;
          font-size: @font-size-base;
          color: @text-color-primary;
        }
      }
    }
  }
  
}
</style>