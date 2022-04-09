import Layout from '@/layouts/blank.vue';
// import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: { title: '仪表盘' },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '概览仪表盘' },
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '统计报表' },
      },
    ],
  },
];