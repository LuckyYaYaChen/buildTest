
/* eslint import/no-dynamic-require:0 */
const APIV1 = '/cfs-web'
const localMock = '/api'
const localCss = ''
const webUrl = ''
// const localCss = '.'
const api = {
  /* **** 登录 ****** */
  // 用户登录
  userLogin: `${APIV1}/login/LoginAuthenticationQry`,
  // 用户退出
  userLogout: `${APIV1}/login/logout`,
  // 校验用户
  userToken: `${APIV1}/user/inspection`,
  // 国际化菜单
  menus: `${APIV1}/menuGlobal`,
  menusLocalMock: `${localMock}/menus`,
  // 首页
  dashboard: `${APIV1}/dashboard`,
  assetPackageRel: `${APIV1}/limitAsset`,
  assetPackage: `${APIV1}/limitCoopr`,
}

export {
  APIV1,
  localMock,
  localCss,
  webUrl,
  api,
}
