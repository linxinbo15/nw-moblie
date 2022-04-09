import { defineStore } from 'pinia';
import { Storage } from '@/utils/Storage';
import { ResultEnum } from '@/utils/httpEnum';
import { encryptionKey } from '@/api/demo';

interface UserState {
  token: string;
  name: string;
  avatar: string;
  encryptKey: string;
  decryptKey: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: Storage.get('ACCESS_TOKEN_KEY', null),
    name: 'amdin',
    avatar: '',
    encryptKey: '',
    decryptKey: '',
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getEncryptKey(): string {
      return this.encryptKey;
    },
    getDecryptKey(): string {
      return this.decryptKey;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getName(): string {
      return this.name;
    },
  },
  actions: {
    // 清空token及用户信息
    resetToken() {
      this.avatar = this.token = this.name = '';
    },
    // 登录成功保存token
    setToken(token: string) {
      this.token = token ?? '';
      // const ex = 7 * 24 * 60 * 60 * 1000;
      // Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },
    setEncryptKey(key: string) {
      this.encryptKey = key ?? '';
    },
    setDecryptKey(key: string) {
      this.decryptKey = key ?? '';
    },
    // 加密获取公钥
    async getEncryptionkey() {
      try {
        const { code, result } = await encryptionKey();
        if (code === ResultEnum.SUCCESS) {
          this.setToken(result.token);
          this.setEncryptKey(result.encryptKey);
          this.setDecryptKey(result.decryptKey);
          // return this.afterLogin();
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 登录成功之后, 获取用户信息以及生成权限路由
    async afterLogin() {
      try {
        // const wsStore = useWsStore();
        // const [userInfo, { perms, menus }] = await Promise.all([getInfo(), permmenu()]);
        // this.perms = perms;
        // this.name = userInfo.name;
        // this.avatar = userInfo.headImg;
        // this.userInfo = userInfo;
        // // 生成路由
        // const generatorResult = generatorDynamicRouter(menus);
        // this.menus = generatorResult.menus;
        // wsStore.initSocket();
        // return { menus, perms, userInfo };
      } catch (error) {
        // return this.logout();
      }
    },
    // 登出
    async logout() {
      // await logout();
      // const wsStore = useWsStore();
      // wsStore.closeSocket();
      // this.resetToken();
      // resetRouter();
    },
  },
});
