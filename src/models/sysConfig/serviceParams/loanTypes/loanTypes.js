import { query, create, update, remove } from '../../../../services/sysConfig/serviceParams/loanTypes/loanType'
import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { pageModel } from '../../../common'

export default modelExtend(pageModel, {
  namespace: 'loanTypes',
  state: {
    list: [],
    changeBtn: true,
    selectedRows: [],
    currentItem: {},
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
  },
  reducers: {
    save (state, { payload: { data: list, total } }) {
      return { ...state, list, total }
    },
  /*  querySuccess (state, action) {
      const { list, pagination } = action.payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },*/
    showModal (state, action) {
      return {
        ...state,
        ...action.payload,
        modalVisible: true,
      }
    },
    // 选择当前的radio
    selectedRow (state, action) {
      return {
        ...state,
        selectedRows: action.payload.selectedRows,
      }
    },
    // 清空当前的radio
    selectedRowClear (state) {
      return {
        ...state,
        selectedRows: [],
      }
    },
    // 获取当前选中的行元素
    getCurrentItem (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    hideModal (state) {
      return {
        ...state,
        modalVisible: false,
      }
    },
    changeBtnType (state, action) {
      let flag = action.payload.changeBtn
      return {
        ...state,
        changeBtn: !flag,
      }
    },
    checkShowModal (state, action) {  /* 核算设置*/
      return {
        ...state,
        ...action.payload,
        checkModalVisible: true,
      }
    },
    checkHideModal (state) {
      return {
        ...state,
        checkModalVisible: false,
      }
    }, salesPrtShowModal (state, action) {  /* 促销设置*/
      return {
        ...state,
        ...action.payload,
        salesPrtModalVisible: true,
      }
    },
    salesPrtHideModal (state) {
      return {
        ...state,
        salesPrtModalVisible: false,
      }
    }, feeRecordShowModal (state, action) {  /* 费用设置*/
      return {
        ...state,
        ...action.payload,
        feeRecordModalVisible: true,
      }
    },
    feeRecordHideModal (state) {
      return {
        ...state,
        feeRecordModalVisible: false,
        addFlag: true,
      }
    }, copyProShowModal (state, action) {  /* 复制产品*/
      return {
        ...state,
        ...action.payload,
        copyProductVisible: true,
      }
    }, copyProHideModal (state) {
      return {
        ...state,
        copyProductVisible: false,
      }
    }, templetModalShow (state, action) {  /* 模板设置*/
      return {
        ...state,
        ...action.payload,
        templetModalVisible: true,
      }
    },
    templetModalHide (state) {
      return {
        ...state,
        templetModalVisible: false,
      }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      const data = yield call(create, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      /**
       * select 查询某个命名空间下的 namespace: 'loanTypes' 的某个state状态
       */
      const id = yield select(({ loanTypes }) => loanTypes.currentItem.id)
      const newLoanType = { ...payload, id }
      const data = yield call(update, newLoanType)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sysConfig/serviceParams/loanTypes') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
})
