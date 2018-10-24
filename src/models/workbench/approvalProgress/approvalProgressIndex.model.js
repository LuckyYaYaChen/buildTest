/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
// import Cookies from 'js-cookie'
import { create, remove, update, aTimeLine, mTomeLine, query, queryOther, print, queryManCode } from '../../../services/workbench/approvalProgress/approvalProgress.service'
import { queryOrgan, queryMerc, queryApplyStatus, queryMessage } from '../../../services/dic/dic.service'
import { pageModel } from '../../common'
import { config, mergeList, getListId, createWindow } from '../../../utils'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'approvalProgress',

  state: {
    namespace: 'approvalProgress',
    currentItem: {},
    tableKey: '',
    examineVisible: false, // 审批轨迹visible
    capitalVisible: false, // 资金轨迹visible
    modalType: 'create',
    selectedRowKeys: [],
    instanceId: '',
    applSeq: null,
    contTyp: '', // 打印的按钮标志
    loanProm: '',
    appl: {}, //
    selectedRows: [], //
    applData: [],
    moneyData: [],
    printVisible: false, // 打印弹层
    arrOrgan: [], // 机构信息
    arrMsg: [], // 打印消息
    arrMerc: [], // 商户信息
    arrApplyStatus: [], // 申请信息
    apptSeq: '',
    flag: false,
    modalKey: '1',
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        location.query = queryString.parse(location.search)
        if (location.pathname === '/workbench/approvalProgress' && location.query) {
          if (location.query.type || location.query.keyword) {
            dispatch({
              type: 'query',
              payload: {
                ...location.query,
                page: location.query.page || 1,
                pageSize: location.query.pageSize || 10,
              },
            })
          }
        } else if (location.pathname === '/workbench/approvalProgress/detail') {
          dispatch({
            type: 'queryManCode',
            payload: {
              applSeq: location.query.applSeq,
            },
          })
        }
      })
    },
  },

  effects: {

    // 详情页面跳转
    * queryManCode ({ payload = {} }, { call, put }) {
      const data = yield call(queryManCode, payload)
      if (data.success) {
        // Cookies.set('name', 'value', { expires: 1 })
        yield put({
          type: 'queryManCodeSuccess',
          payload: {
            apptSeq: data.data.data.apptSeq,
            flag: data.data.data.flag,
          },
        })
      } else {
        throw data.message
      }
    },
    // 打印消息提示
    * queryMessage ({ payload = {} }, { call, put }) {
      const data = yield call(queryMessage, payload)
      if (data.success) {
        // Cookies.set('name', 'value', { expires: 1 })
        yield put({
          type: 'queryMessageSuccess',
          payload: {
            arrMsg: data.data.data,
          },
        })
      } else {
        throw data.message
      }
    },
    // 机构信息查询
    * queryOrgan ({ payload = {} }, { call, put }) {
      const data = yield call(queryOrgan, payload)
      if (data.success) {
        yield put({
          type: 'queryOrganSuccess',
          payload: {
            arrOrgan: data.data.data,
          },
        })
      } else {
        throw data.message
      }
    },
    // 商户信息查询
    * queryMerc ({ payload = {} }, { call, put }) {
      const data = yield call(queryMerc, payload)
      if (data.success) {
        yield put({
          type: 'queryMercSuccess',
          payload: {
            arrMerc: data.data.data,
          },
        })
      } else {
        throw data.message
      }
    },
    // 申请状态查询
    * queryApplyStatus ({ payload = {} }, { call, put }) {
      const data = yield call(queryApplyStatus, payload)
      if (data.success) {
        yield put({
          type: 'queryApplyStatusSuccess',
          payload: {
            arrApplyStatus: data.data.data,
          },
        })
      } else {
        throw data.message
      }
    },
    // 查询列表第一部分
    * query ({ payload = {} }, { call, put }) {
      yield put({ type: 'tableKey' })
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'changeLoadingOtherFlag',
        })
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 1,
              total: data.data.total,
              pageSizeOptions: ['10', '20', '30', '40'],
            },
          },
        })
        if (data.data.data.length > 0) {
          yield put({
            type: 'queryOther',
            payload: {
              page: payload.page,
              pageSize: payload.pageSize,
              data: getListId(data.data.data, 'tApprvTnr', 'tApprvAmt', 'applSeq'),
            },
          })
        }
      } else {
        throw data.message
      }
    },
    // 查询列表第二部分
    * queryOther ({ payload = {} }, { call, put, select }) {
      const data = yield call(queryOther, payload)
      if (data.success) {
        const list = yield select(({ approvalProgress }) => approvalProgress.list)
        yield put({
          type: 'queryOtherSuccess',
          payload: {
            list: mergeList(list, data.data.data, 'applSeq'),
            pagination: {
              current: Number(payload.page),
              pageSize: Number(payload.pageSize),
              total: data.data.total,
              pageSizeOptions: ['5', '10', '20', '30', '40'],
            },
          },
        })
        yield put({
          type: 'selectedRow',
          payload: {
            selectedRows: [],
          },
        })
      } else {
        throw data.message
      }
    },
    // 打印
    * print ({ payload }, { call, put }) {
      yield put({ type: 'contTyp', payload: { contTyp: payload.contTyp } })
      const data = yield call(print, payload)
      yield put({ type: 'hidePrintModal' })
      if (data.success) {
        // 新建窗口预览文件
        createWindow(data.data.data)
      } else {
        yield put({ type: 'hidePrintModal' })
        throw data.message
      }
    },

    // 查询审批轨迹
    * aTimeLine ({ payload }, { call, put }) {
      yield put({ type: 'showModal' })
      const data = yield call(aTimeLine, payload)
      if (data.success) {
        yield put({
          type: 'aTimeLineSuccess',
          payload: {
            appl: data.data.appl,
            applData: data.data.data,
            instanceId: payload.instanceId,
            applSeq: payload.applSeq,
          },
        })
      } else {
        throw data.message
      }
    },

    // 查询资金轨迹
    * mTomeLine ({ payload }, { call, put }) {
      yield put({ type: 'showCapitalModal' })
      const data = yield call(mTomeLine, payload)
      if (data.success) {
        yield put({
          type: 'mTimeLineSuccess',
          payload: {
            moneyData: data.data.data,
            applSeq: payload.applSeq,
          },
        })
      } else {
        throw data.message
      }
    },
    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data.message
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.message
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.message
      }
    },

  },

  reducers: {

    queryManCodeSuccess (state, { payload }) {
      return { ...state, ...payload }
    },

    contTyp (state, { payload }) {
      return { ...state, ...payload }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, examineVisible: true }
    },

    showPrintModal (state, { payload }) {
      return { ...state, ...payload, printVisible: true }
    },

    hidePrintModal (state) {
      return { ...state, printVisible: false }
    },

    selectedRow (state, { payload }) {
      return { ...state, selectedRows: payload.selectedRows }
    },

    hideModal (state) {
      return { ...state, examineVisible: false }
    },

    aTimeLineSuccess (state, { payload }) {
      return { ...state, ...payload, refreshLoading: false }
    },

    mTimeLineSuccess (state, { payload }) {
      return { ...state, ...payload, refreshLoading: false }
    },

    showCapitalModal (state, { payload }) {
      return { ...state, ...payload, capitalVisible: true }
    },

    queryMessageSuccess (state, { payload }) {
      return { ...state, ...payload }
    },

    queryApplyStatusSuccess (state, { payload }) {
      return { ...state, ...payload }
    },

    queryOrganSuccess (state, { payload }) {
      return { ...state, ...payload }
    },

    queryMercSuccess (state, { payload }) {
      return { ...state, ...payload }
    },

    hideCapitalModal (state) {
      return { ...state, capitalVisible: false }
    },

    switchIsMotion (state) {
      window.btoalocalStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

    queryOtherSuccess (state, { payload }) {
      let { list, pagination } = payload
      list.forEach((item, index) => {
        item.key = `${(pagination.current * pagination.pageSize + index).toString()}MM`
      })
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
          total: list.length <= 0 ? 0 : pagination.total,
        },
      }
    },
    // tableKey
    tableKey (state) {
      return { ...state, tableKey: Math.random().toString() }
    },
  },
})
