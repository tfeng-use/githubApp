import { getTrendingList } from "../js/service";
export default {
  namespace: "trending",
  /**
   * trendingTab的数据结构
   * ```
   * {
   *  type: {
   *    list: [], // 获取的所有数据
   *    currentList: [], // 模拟分页后显示的数据
   *    startPage: 1, // 开始的页数
   *    pageSize: 10, // 每一页数据的条数
   *    refreshing: boolean, // 显示refreshing
   *    finished: false, // 数据是否已经请求完毕
   *  }
   * }
   * ```
   */
  state: {
    trendingTab: {}
  },

  effects: {
    *refresh({ payload }, { call, put }) {
      let { type } = payload;
      yield put({ type: "refreshList", payload: { type } });
    },
    *getList({ payload }, { call, put }) {
      let { startPage, language, since } = payload;
      if (!startPage) {
        let res = yield call(getTrendingList, language, { since });
        yield put({
          type: "trendingList",
          payload: {
            language,
            data: res.items
          }
        });
      } else {
        yield put({
          type: "trendingList",
          payload: {
            language,
            startPage: startPage
          }
        });
      }
    }
  },
  /**
   * action的数据结构
   * ```
   * {
   *  payload: {
   *    data: [],
   *    type: '',
   *    pageSize: number,
   *    startPage: number
   *  }
   * }
   * ```
   */
  reducers: {
    // 获取list
    trendingList(state, action) {
      let { payload } = action;
      let { pageSize = 10, startPage = 0 } = payload;
      let { trendingTab } = state;
      let currentListLength = (startPage + 1) * pageSize;
      let list = !startPage
        ? payload.data
        : trendingTab[payload.language] && trendingTab[payload.language].list;
      return {
        ...state,
        trendingTab: {
          ...trendingTab,
          [payload.language]: {
            list: list,
            currentList:
              currentListLength >= list.length
                ? list
                : list.slice(0, currentListLength),
            finished: currentListLength >= list.length ? true : false, // 是否请求已经结束
            refreshing: false,
            startPage,
            pageSize
          }
        }
      };
    },
    // 将refreshing设置为true
    refreshList(state, action) {
      let { payload } = action;
      let { type } = payload;
      return {
        ...state,
        trendingTab: {
          ...state.trendingTab,
          [type]: {
            ...state.trendingTab[type],
            refreshing: true
          }
        }
      };
    }
  }
};
