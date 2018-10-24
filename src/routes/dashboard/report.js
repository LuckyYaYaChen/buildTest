import React from 'react'
/* import { Row, Col } from 'antd' */
import styles from './index.less'
import { config } from '../../utils'

const { dashboardFirstReport } = config
// import Echarts from ''

const Report = () => {
  return (
    <div>
      <iframe title="report" id="iframeBIReport" className={styles.normal} src={`${dashboardFirstReport}`} />
      {/*   <Row style={{ height: '50%', background: '#efefef', padding: '5px', paddingBottom: 0 }}>
        <Col className={styles.border} span={10} style={{ background: '#fff' }}>
          <iframe id="iframeBIReport" className={styles.normal} src={dashboardfenbu}></iframe>
        </Col>
        <Col className={styles.border} span={14} style={{ background: '#fff', borderLeft: '5px solid #efefef' }}>
          <iframe id="iframeBIReport" className={styles.normal} style={{ paddingLeft: '60px' }} src={dashboardhotongzhu}></iframe>
        </Col>
      </Row>
      <Row style={{ height: '50%', background: '#efefef', padding: '5px', paddingBottom: 0 }}>
        <Col className={styles.border} span={14} style={{ background: '#fff', borderRight: '5px solid #efefef' }}>
          <iframe id="iframeBIReport" className={styles.normal} style={{ paddingLeft: '40px' }} src={warningResultyuanshi}></iframe>
        </Col>
        <Col className={styles.border} span={10} style={{ background: '#fff' }}>
          <iframe id="iframeBIReport" className={styles.normal} style={{ marginLeft: '-35px' }} src={dashboardhetongzhe}></iframe>
        </Col>
      </Row> */}
    </div>
  )
}


export default Report

