import { localCss, webUrl, api, viewUrl, localMock } from './api'

const apiPrefix = '/api'

module.exports = {
  name: '一润供应链金融业务管理系统',
  webUrl,
  applicationCode: 'CFSW',
  prefix: 'yirunscfs',
  footerText: 'yirunscfs 版权所有',
  logo: `${localCss}/logo.png`,
  jiaji: `${localCss}/jiaji.png`,
  loadingGif: `${localCss}/loading.gif`,
  pdfIcon: `${localCss}/pdf.png`,
  upload: `${localCss}/upload.png`,
  build: `${localCss}/build.gif`,
  smallLogo: `${localCss}/small-logo.png`,
  iconFontCSS: `${localCss}/iconfont.css`,
  iconFontJS: `${localCss}/iconfont.js`,
  iconMenuCSS: `${localCss}/menuIcon/iconfont.css`,
  iconMenuJS: `${localCss}/menuIcon/iconfont.js`,
  // baseURL: ['http://localhost:8001'],
  baseURL: ['http://localhost:8000'],
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: [`${webUrl}/login`],
  apiPrefix: '/api',
  api,
  localMock,
  viewUrl,
  myLogin: `${apiPrefix}/user/login`,
}
