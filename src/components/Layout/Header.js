import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Radio } from 'antd'
// import { FormattedMessage } from 'react-intl'
// import Cookies from 'js-cookie'
import Cookies from 'js-cookie'
import styles from './Header.less'
import Menus from './Menu'


const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const SubMenu = Menu.SubMenu

const Header = ({ logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, handleChange, menu, changeLanguage }) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  let token = Cookies.get('token')
  let usrName = ''
  if (token) {
    usrName = JSON.parse(token).sessionId
  } else {
    usrName = ''
  }
  // const { usrName = '' } = JSON.parse(Cookies.get('token'))
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.button} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {usrName}
            </span>}
          >
            <Menu.Item key="logout">
              退出
            </Menu.Item>
          </SubMenu>
        </Menu>
        <RadioGroup style={{ float: 'right', display: 'none', marginTop: '10px', marginRight: '10px' }} defaultValue={changeLanguage} onChange={handleChange}>
          <RadioButton value="zh_CN">中文</RadioButton>
          <RadioButton value="en_US">EN</RadioButton>
        </RadioGroup>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  // app: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
  changeLanguage: PropTypes.string,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  handleChange: PropTypes.func,
}

export default Header
