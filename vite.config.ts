import { ConfigEnv, UserConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// 安装 @types/node 可以支持 node 的类型
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

const CWD = process.cwd();
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);
  return {
    base: VITE_BASE_URL,
    // plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),  // 将 src 目录设置
      },
    },

    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
    ],

    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          // 后台接口REST API
          target: 'http://hjz-h5.d.5irich.com/wirich-research-h5/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }  
};
