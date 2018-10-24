import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button, Row, Form, Input, Icon } from 'antd'
import TweenOne from 'rc-tween-one'
import styles from './index.less'
import { webUrl } from '../../utils/config'

const FormItem = Form.Item

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginLoading } = login

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      // dispatch({ type: 'login/login', payload: values })
      dispatch(routerRedux.push(`${webUrl}/dashboard/`))
    })
  }

  return (
    <div className={styles.form}>
      <TweenOne
        animation={[
          { opacity: 1, duration: 2000 },
          { y: 30, duration: 2000 },
          { translateY: '0', repeat: -1, duration: 2000, yoyo: true },
        ]}
      >
        <div className={styles.animationBg} />
      </TweenOne>
      <TweenOne
        animation={[
          { opacity: 0.5, duration: 2000 },
          { y: -30, duration: 2000 },
          { translateY: '0', translateX: '0', repeat: -1, duration: 2000, yoyo: true },
        ]}
      >
        <div className={styles.animationBg2} />
      </TweenOne>
      <div style={{ padding: '40px 46px' }}>
        <div className={styles.logo} />
        <form>
          <Icon type="user" className={styles.ueserIcon} />
          <FormItem hasFeedback>
            {getFieldDecorator('empSid', {
              initialValue: '测试用户',
              rules: [
                {
                  required: true,
                  message: '用户empSid',
                },
              ],
            })(<Input size="large" onPressEnter={handleOk} placeholder="用户empSid" className={styles.ueserName} />)}
          </FormItem>
          <Icon type="lock" className={styles.ueserIcon} />
          <FormItem hasFeedback>
            {getFieldDecorator('usrCde', {
              initialValue: '12345678',
              rules: [
                {
                  required: true,
                  message: '密码不能为空',
                },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="用户id" className={styles.ueserName} />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={loginLoading} className={styles.myLogin}>
              登录
            </Button>
            {/* <p className={styles.register}><span><Icon type="right-circle" /> 立即注册</span> <span>忘记密码</span></p> */}
          </Row>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
