export default {
  namespace: "base",

  state: {
    theme: "red",
    isIphoneX: undefined
  },

  effects: {
    *changeTheme({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "theme", payload: { ...payload } });
    },
    *changeIphonex({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "iphonex", payload: payload });
    }
  },

  reducers: {
    theme(state, action) {
      return { ...state, ...action.payload };
    },
    iphonex(state, action) {
      return { ...state, isIphoneX: action.payload };
    }
  }
};
