import React from 'react'
import { Row, Col } from 'antd'
import styles from './index.less'
import { config } from '../../utils'
// import Cookies from 'js-cookie'
const myDate = new Date()

const Header = () => {
  /* let token = Cookies.get('token') */
  return (
    <div className={styles.header}>
      <Row>
        <Col className={styles.border} span={12}>
          <div>
            <div className={styles.headerBox}><img alt={'logo'} src={config.logo} /></div>
            <div className={styles.headerText}>
              {/* <div>{JSON.parse(token).username}</div> */}
              <div>{myDate.toLocaleDateString()}</div>
            </div>
          </div>
        </Col>
        <Col className={styles.borderText} span={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ padding: '10px 37px', fontSize: '14px', color: '#fff', lineHeight: '25px' }}>
            资产分部 <br />
            <span style={{ fontSize: '12px' }}>
              8.25日 <br />
              发贷款合同地域分布贷款合同合同地域分合同地域分地域分布 <br />
            </span>
          </div>
          <div style={{ width: '100px', height: '100px', marginLeft: '40px', textAlign: 'center', lineHeight: '100px' }}>
            <img alt={'upload'} src={config.upload} />
          </div>
        </Col>
      </Row>
    </div>
  )
}


export default Header

