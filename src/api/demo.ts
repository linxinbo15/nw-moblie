import request from '@/utils/request';
import { UrlEnum } from '@/utils/httpEnum';
// 获取秘钥 organiz/encryption/key
export function encryptionKey() {
  return request({
    url: UrlEnum.API + 'organiz/encryption/key',
    method: 'post',
  });
}
  