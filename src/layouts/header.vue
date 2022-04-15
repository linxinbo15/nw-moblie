<template>
    <t-navbar ref="navberRef" :rightShow="false">
      {{ $route.meta?.title }}
      <template #right>
        <FilterIcon @click="onClickMore"></FilterIcon>
      </template>
    </t-navbar>
    <t-popup v-model="right" placement="right">
      <div class="popup-fund">
        <div class="popup-content">
          <div class="popup-t">基金类型</div>
          <div class="popup-box flex-warp">
            <div v-for="(item, index) in fundStore.fundTypeOption" :key="index" @click="onClickFundType(item.value)" :class="fundStore.formParams.fundType === item.value ? 'popup-item active' : 'popup-item'">                
              {{ item.text }}</div>
          </div>
          <div class="popup-t">收益期限</div>
          <div class="popup-box flex-warp">
            <div v-for="(item, index) in fundStore.rangeTypeOption" :key="index" @click="onClickRangeType(item.value)" :class="fundStore.formParams.returnConditionNum === item.value ? 'popup-item active' : 'popup-item'">                
              {{ item.text }}</div>
          </div>
        </div>
        <div class="popup-end">
          <t-button-group>
            <t-button theme="ghost">重置</t-button>
            <t-button theme="primary">查询</t-button>
          </t-button-group>
        </div>
      </div>
      
    </t-popup>
    <div class="fundcontainer">
      <router-view />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, h, nextTick } from 'vue';
import { main } from '@/router/modules/tabBar';
import { FilterIcon } from 'tdesign-icons-vue-next';
import { useFundStore } from '@/store/modules/fund';

export default defineComponent({
  components: { FilterIcon },
  setup() {
    const value = ref(0);
    
    // 获取dom节点
    const navberRef = ref(null);
    const fundHeight = ref('');
    console.log(navberRef);

    const right = ref(false);
    const fundStore = useFundStore();

    nextTick(() => {
      // 获取dom节点 高度
      fundHeight.value = navberRef.value?.$el.offsetHeight + 'px';
    });

    const onClickFundType = (value: number) => {
      fundStore.formParams.fundType = value;
    }

    const onClickRangeType = (value: number) => {
      fundStore.formParams.returnConditionNum = value;
    }

    const onClickMore = () => {
      right.value = true;
      console.log('on click more');
    };

    const onClickText = () => {      
      console.log('on click Text');
    };
    
    const onClickLeft =() => {
      console.log('on click left');
    };

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
      navberRef,
      fundHeight,
      onClickMore,
      onClickLeft,
      onClickText,
      right,
      fundStore,
      onClickFundType,
      onClickRangeType,
    };
  },
});
</script>
<style lang="less">
  @import '@/style/variables.less';
  .fundcontainer {
    --height: v-bind('fundHeight');
    --container-height: calc(100vh - var(--height));

    height: calc(100vh - var(--height));
    overflow: auto;
  }

  .popup-fund {
    width: 200px;
    height: 100%;
    background-color: @bg-white;
    

    

    .popup-content {
      padding: 10px 15px;

      .popup-t {
        font-size: @font-size-base;
        color: @text-color-primary;
        padding: 10px 0;
      }

      .popup-box {      
        .popup-item {
          padding: 6px 15px;
          font-size: @font-size-base;
          color: @text-color-placeholder;
          border: 1px solid @border-level-2-color;
          margin-right: 10px;
          margin-bottom: 10px;
        }

        .popup-item.active {
          color: @brand-color-7;
          border: 1px solid @brand-color-7;
        }
      }

    }

    .popup-end {
      position: fixed;
      bottom: 0;
      width: 200px;
    }

    
  }
</style>
