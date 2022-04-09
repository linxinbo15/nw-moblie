import { h, unref } from 'vue';
import { Icon  } from 'tdesign-icons-vue-next';
/**
 * render 图标
 * */
export const renderIcon = (icon: string) => {
  return h(Icon, {
    name: icon,
    },
  );
}