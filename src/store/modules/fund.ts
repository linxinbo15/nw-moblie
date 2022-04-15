import { defineStore } from 'pinia';
import { ResultEnum } from '@/utils/httpEnum';
import { encryptionKey } from '@/api/demo';

interface typeObject {
  text: string;
  value: number;
}

interface params {
  sortType: number,
  sortField: string,
  returnConditionNum: number,
  fundType: number,
  pageNum: number,
  pageSize: number,
}

interface FundState {
  fundTypeOption: Array<typeObject>;
  rangeTypeOption: Array<typeObject>;
  formParams: params;
}

export const useFundStore = defineStore({
  id: 'fund',
  state: (): FundState => ({
    fundTypeOption: [
      { text: '股票型', value: 1 },
      { text: '混合型', value: 2 },
      { text: '债券型', value: 3 },
      { text: '货币型', value: 4 },
      { text: '其他', value: 5 },
    ],
    rangeTypeOption: [
      {
        value: 0,
        text: '日涨幅',
      },
      {
        value: 1,
        text: '近一周',
      },
      {
        value: 2,
        text: '近一月',
      },
      {
        value: 3,
        text: '近三月',
      },
      {
        value: 4,
        text: '近六月',
      },
      {
        value: 5,
        text: '近一年',
      },
      {
        value: 6,
        text: '今年以来',
      },
      {
        value: 7,
        text: '近三年',
      },
      {
        value: 8,
        text: '近五年',
      },
      {
        value: 9,
        text: '成立以来',
      },
    ],
    formParams: {
      sortType: 2,
      sortField: 'compositiveScore',
      returnConditionNum: 0,
      fundType: 1,
      pageNum: 1,
      pageSize: 10,
    },
  }),
  getters: {
    getFundTypeOption(): Array<typeObject> {
      return this.fundTypeOption;
    },
    getRangeTypeOption(): Array<typeObject> {
      return this.rangeTypeOption;
    },
    getFormParams(): params {
      return this.formParams;
    },
  },
  actions: {
    // 清空token及用户信息
    resetFormParams() {
      this.formParams = {
        sortType: 2,
        sortField: 'compositiveScore',
        returnConditionNum: 0,
        fundType: 1,
        pageNum: 1,
        pageSize: 10,
      };
    },
    // 保存查询参数
    setFormParams(params: params) {
      this.formParams = params;
      // const ex = 7 * 24 * 60 * 60 * 1000;
      // Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },
  },
});
