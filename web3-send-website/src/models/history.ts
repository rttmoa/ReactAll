

export default {
  namespace: 'history',
  state: {
    data: [],

  },
  reducers: {
    update(state:any, { payload }:any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *updateData({ payload }: any, { put }: any) {
      yield put({ type: 'update', payload });
    },
  },
};
