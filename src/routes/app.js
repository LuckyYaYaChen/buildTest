/* global window */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import { LocaleProvider } from 'antd'
import NProgress from 'nprogress'
import { IntlProvider } from 'react-intl'
// import enUS from 'antd/lib/locale-provider/en_US'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { Layout, Loader } from '../components'
import { classnames, config } from '../utils'
import '../themes/index.less'
import './app.less'

const { prefix, openPages } = config


const { Header, Bread, Footer, Sider, styles } = Layout
let lastHref

const App = ({ children, dispatch, app, loading, location }) => {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, changeLanguage, keyy, /*  formatAntdObj, */ navOpenKeys, menu, format } = app
  const href = window.location.href
  let { pathname } = location
  let formatAntd = ''
  const handleChange = (e) => {
    /*    if (e.target.value === 'zh_CN') {
      formatAntd = 'zhCN'
    } else if (e.target.value === 'en_US') {
      formatAntd = 'enUS'
    } */
    dispatch({
      type: 'app/queryMenu',
      payload: {
        formatType: e.target.value,
        formatAntdType: formatAntd,
      },
    })
  }

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    app,
    changeLanguage,
    handleChange,
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    menu,
    app,
    siderFold,
    location,
    darkTheme,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const breadProps = {
    menu,
    location,
  }
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }
  const { iconFontJS, iconFontCSS, logo, iconMenuCSS, iconMenuJS } = config
  return (
    <IntlProvider
      locale={'en'}
      messages={format}
    >
      <LocaleProvider locale={zhCN}>
        <div>
          <Helmet>
            <title>cfs</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href={logo} type="image/x-icon" />
            {iconFontJS && <script src={iconFontJS} />}
            {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
            {iconMenuJS && <script src={iconMenuJS} />}
            {iconMenuCSS && <link rel="stylesheet" href={iconMenuCSS} />}
          </Helmet>
          <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
            {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
              <Sider {...siderProps} />
            </aside> : ''}
            <div className={styles.main}>
              <div>
                <Header {...headerProps} />
                <Bread {...breadProps} />
              </div>
              <div className={styles.container}>
                <div style={{ minHeight: '100%' }} key={keyy} className={styles.content} id="selectContainer">
                  {children}
                </div>
              </div>
              <div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </LocaleProvider>
    </IntlProvider>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  menu: PropTypes.array,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
