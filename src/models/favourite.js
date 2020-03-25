// import { getFavoriteList } from "../js/service";
export default {
  namespace: "popular",
  state: {
    starTable: {
      favorite: {
        stars: [], // 由所有star的item组成的数组
        currentStars: [], // 当前要显示的数组
        starNames: [], // 由所有的收藏item的name组成的数组
        startPage: 0,
        finished: false,
        refreshing: false
      },
      trending: {
        stars: [], // 由所有star的item组成的数组
        currentStars: [], // 当前要显示的数组
        starNames: [], // 由所有的收藏item的name组成的数组
        startPage: 0,
        finished: false,
        refreshing: false
      }
    }
  },

  effects: {
    *getList({ payload }, { call, put }) {
      let { startPage = 0, type } = payload;
      yield put({
        type: "popularList",
        payload: {
          type,
          startPage
        }
      });
    },
    *refresh({ payload }, { call, put }) {
      let { type } = payload;
      yield put({ type: "refreshList", payload: { type } });
    },
    *addStar({ payload }, { call, put }) {
      let { type, item } = payload;
      yield put({ type: "starItem", payload: { type, item, method: "add" } });
    },
    *deleteStar({ payload }, { call, put }) {
      let { type, item, name } = payload;
      yield put({
        type: "starItem",
        payload: { type, item, name, method: "delete" }
      });
    }
  },
  reducers: {
    // 获取 list
    popularList(state, action) {
      let { payload } = action;
      let { pageSize = 10, startPage = 0, type } = payload;
      let { starTable } = state;
      let currentListLength = (startPage + 1) * pageSize;
      let { stars } = state.starTable[type];
      return {
        ...state,
        starTable: {
          ...starTable,
          [type]: {
            currentList:
              currentListLength >= stars.length
                ? stars
                : stars.slice(0, currentListLength),
            finished: currentListLength >= stars.length ? true : false, // 是否请求已经结束
            refreshing: false,
            startPage,
            pageSize
          }
        }
      };
    },
    // 将 refreshing 设置为 true
    refreshList(state, action) {
      let { payload } = action;
      let { type } = payload;
      return {
        ...state,
        starTable: {
          ...state.starTable,
          [type]: {
            ...state.starTable[type],
            refreshing: true
          }
        }
      };
    },
    // 处理单个starItem
    starItem(state, action) {
      let { payload } = action;
      let { type, item, method, name } = payload;
      let { stars, starNames } = state.starTable[type];
      let name = item.fullName || item.full_name;
      if (method === "add") {
        if (!starNames.include(name)) {
          stars.push(item);
          starNames.push(name);
        }
      } else if (method === "delete") {
        let index = starNames.indexOf(name);
        starNames.splice(index, 1);
        stars.splice(index, 1);
      }

      return {
        ...state,
        starTable: {
          ...state.starTable,
          [type]: {
            ...state.starTable[type],
            refreshing: false,
            stars: stars,
            starNames: starNames
          }
        }
      };
    }
  }
};
