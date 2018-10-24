/* global window */
/* global document */
/* global location */
/* eslint no-lonely-if:0 */
import { parse } from 'qs'
import Cookies from 'js-cookie'
import enUS from 'antd/lib/locale-provider/en_US'
import { routerRedux } from 'dva/router'
import { config } from '../utils'
import { query, logout } from '../services/app'
import * as menusService from '../services/menus'

const { prefix } = config

// import zhCN from 'antd/lib/locale-provider/zh_TW'

export default {
  namespace: 'app',
  state: {
    user: {},
    buttonLoading: false,
    menu: [],
    keyy: 1,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup ({ dispatch }) {
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },
  },
  effects: {
    * query ({
      payload,
    }, { call, put }) {
      debugger
      if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
        let from = location.pathname
        window.location = `${location.origin}/login?from=${from}`
      }
    },

    * queryMenu ({ payload }, { call, put }) {
      const data = yield call(menusService.query, payload)
      yield put({
        type: 'changeLanguageData',
        payload: {
          changeLanguage: payload.formatType,
        },
      })
      if (data) {
        yield put({
          type: 'querySuccessMenu',
          payload: {
            formatType: payload.formatType,
            formatAntdType: payload.formatAntdType,
            menu: data.data.data,
          },
        })
      }
    },
    * logout ({
      payload,
    }, { call }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        window.location = location.origin
        // yield put({ type: 'query' })
      } else {
        throw (data)
      }
      // const SignOut = yield call(singleSignOut)
      // if (SignOut.status === 'logout') {
      // }
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    signParam ({ payload }) {
      return {
        signN: payload.username,
        signP: payload.password,
      }
    },
    querySuccess (state, { payload }) {
      return {
        ...state,
        user: payload.user,
        menu: payload.menu,
      }
    },

    querySuccessMenu (state, { payload }) {
      let format = {}
      let formatAntdObj = {}
      if (payload.formatType === 'zh_CN') {
        format = zHcN
        formatAntdObj = {}
      } else {
        format = eNuS
        formatAntdObj = enUS
      }
      return {
        ...state,
        format,
        formatAntdObj,
        keyy: state.keyy + 1,
        menu: payload.menu,
        formatType: payload.formatType,
        formatAntdType: payload.formatAntdType,
      }
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },
    changeLanguageData (state, { payload }) {
      const { changeLanguage } = payload.changeLanguage
      return {
        ...state,
        changeLanguage,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
