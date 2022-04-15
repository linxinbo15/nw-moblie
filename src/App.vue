<template>
  <router-view #="{ Component }">
    <!-- <keep-alive> -->
    <component :is="Component" />
    <!-- </keep-alive> -->
  </router-view>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useUserStore } from '@/store/modules/user';

  export default defineComponent({
    name: 'App',
    setup() {
      const userStore = useUserStore();
      onMounted(async () => {
        userStore.getEncryptionkey();
        // getFundDescription();
        // console.log(loadDataTable.value.tacticsType);
      });
    },
  });
</script>
<style lang="less">
@import '@/style/variables.less';
</style>
