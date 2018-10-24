import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Button, Icon } from 'antd'
import styles from './style.less'

const Panel = Collapse.Panel

const Timeline = ({ timeArr }) => {
  // timeLinePaneHeader
  const timeLinePaneHeader = (item) => {
    return (
      <div className={styles.timeLinePaneHeaderStyle}>
        <div>{item.text}</div>
        <div>{item.text}</div>
        <div>{item.time}</div>
      </div>
    )
  }
  return (
    <div className="time-line-ctnr">
      <div className={styles.refreshContent}>
        <Button type="primary" className={styles.refresh}><Icon type="sync" /></Button>
        <div className={styles.headerStyle}>
          <div>最新刷新时间：2017-10-18 14:17:37</div>
          <div>借款人：刘1850  申请编号：201705221700000143245</div>
        </div>
      </div>
      <ul className="time-line">
        {timeArr.map((item, index) => {
          return (<li key={index}>
            <i className="fa" />
            <div className="time-line-item">
              <div className="time-line-header">
                <Collapse bordered={false} >
                  {/* timeLinePaneHeader */}
                  <Panel header={timeLinePaneHeader(item)} key="1" className={styles.customPanelStyle}>
                    <p>{item.text}</p>
                    <p>{item.text}</p>
                    <p>{item.text}</p>
                    <p>{item.text}</p>
                    <p>{item.text}</p>
                    <p>{item.text}</p>
                    <p>{item.text}</p>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </li>)
        }
        )}
      </ul>
    </div>
  )
}

Timeline.propTypes = {
  timeArr: PropTypes.array,
}

export default Timeline

