<template>
  <div>
    <div class="logo-demo">
      <t-image class="image-container" :src="image" alt="一张图片"></t-image>
    </div>    
    <t-cell-group title="用户登录">
      <t-input placeholder="请输入手机号码">
        <template #suffix>
          <t-button variant="text">发送验证码</t-button>
        </template>
      </t-input>
      <t-input label="验证码" placeholder="输入验证码">
        <template #suffix>
          <div>手机验证码</div>
        </template>
      </t-input>
    </t-cell-group>
    <div class="grid-demo">
      <t-button theme="primary" block>登录</t-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';

  export default defineComponent({
    name: 'Home',
    setup() {
      const formData = ref({
        phone: '',
        verifyCode: '',
        checked: false,
      });
      const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
      return {
        formData,
        image,
      };
    },
  });
</script>

<style lang="less" scoped>
.logo-demo {
  padding: 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.grid-demo {
  margin: 8px 16px 8px;
}
.image-container {
  width: 72px;
  height: 72px;
}
</style>