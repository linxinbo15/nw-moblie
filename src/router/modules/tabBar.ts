// import { RouteRecordRaw } from 'vue-router';
import { renderIcon } from '@/utils/index';
interface metaTypes {
    title?: string;
    icon?: any;
}

interface tabBerTypes {
    path: string;
    name: string;
    meta: metaTypes;
}


export const main: Array<tabBerTypes> = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: renderIcon('app'),
    },
  },
  {
    path: '/option',
    name: 'Option',
    meta: {
      title: '自选',
      icon: renderIcon('server'),
    },
  },
  {
    path: '/my',
    name: 'My',
    meta: {
      title: '我的',
      icon: renderIcon('user-avatar'),
    },
  },
];