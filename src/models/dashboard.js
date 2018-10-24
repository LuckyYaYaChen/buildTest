/* eslint no-lonely-if:0 */
/* global window */
/* global location */
import { parse } from 'qs'
import { routerRedux } from 'dva/router'
import Cookies from 'js-cookie'
import { config } from '../utils'
import { query, logout, singleSignOut } from '../services/app'

export default {
  namespace: 'dashboard',
  state: {},
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
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
    },

    * logout ({
      payload,
    }, { call, put }) {
      const SignOut = yield call(singleSignOut)
      if (SignOut.status === 'logout') {
        const data = yield call(logout, parse(payload))
        if (data.success) {
          yield put({ type: 'query' })
        } else {
          throw (data)
        }
      }
    },

  },
  reducers: {
    querySuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },
  },
}
