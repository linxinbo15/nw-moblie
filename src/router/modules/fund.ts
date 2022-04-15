import NHeader from '@/layouts/header.vue';
// import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/fund',
    component: NHeader,
    redirect: '/fund/list',
    name: 'Fund',
    meta: { title: '基金' },
    children: [
      {
        path: 'list',
        name: 'FundList',
        component: () => import('@/pages/fund/index.vue'),
        meta: { title: '基金列表' },
      },
      {
        path: 'detail',
        name: 'FundDetail',
        component: () => import('@/pages/fund/detail.vue'),
        meta: { title: '基金详情' },
      },
    ],
  },
];