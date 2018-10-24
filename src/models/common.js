/* global window */
import modelExtend from 'dva-model-extend'
import { getNowFormatDate } from '../utils'

const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const pageModel = modelExtend(model, {
  state: {
    loadingFlag: 0, // 判断是否加载第二个接口数据的标志
    refreshDate: '', // 时间轨迹加载刷新时间
    changeBtn: true, // 高级搜索简单搜索flag
    changeBtnNum: 0, // 高级搜索简单搜索flag
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条·`,
      current: 1,
      total: 0,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      let { list, pagination } = payload
      list.forEach((item, index) => {
        item.key = (pagination.current * pagination.pageSize + index).toString()
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
    // 改变 refreshLoading 时间轨迹加载loading
    refreshTimeLine (state) {
      const refreshDate = getNowFormatDate()
      // console.log(Date.parse(new Date()).toLocaleString())
      return { ...state, refreshDate }
    },
    // 切换高级搜索和简单搜索
    changeSearchType (state) {
      window.localStorage.setItem('changeBtn', !state.changeBtn)
      return {
        ...state,
        changeBtnNum: state.changeBtnNum + 1,
        changeBtn: !state.changeBtn,
      }
    },
  },
})


module.exports = {
  model,
  pageModel,
}
