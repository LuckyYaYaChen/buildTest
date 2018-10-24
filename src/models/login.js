/* global window */
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import Cookies from 'js-cookie'
import { message } from 'antd'
import { login } from '../services/login'
import { webUrl } from '../utils/config'
import { queryURL } from '../utils'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        location.query = queryString.parse(location.search)
        if (location.pathname === `${webUrl}/login`) {
          dispatch({
            type: 'login',
          })
        }
      })
    },
  },

  effects: {
    * login ({ payload }, { put, call }) {
      // yield put(routerRedux.push(`${webUrl}/dashboard/`))
    /*  const data = yield call(login, { empSid: payload.empSid, usrCde: payload.usrCde })
      if (data.success) {
        const from = queryURL('from')
        if (from) {
          yield put(routerRedux.push(queryString.parse(from).from))
        } else {
          yield put(routerRedux.push(`${webUrl}/error`))
        }
      } else {
        message.error(data.message)
        yield put(routerRedux.push(`${webUrl}/error`))
      }*/
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
