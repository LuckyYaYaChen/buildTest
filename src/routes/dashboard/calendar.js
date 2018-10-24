/* eslint react/no-multi-comp:0, no-console:0 */
/* global location */
import 'rc-calendar/assets/index.css'
import React, { Component } from 'react'
import FullCalendar from 'rc-calendar/lib/FullCalendar'

import 'rc-select/assets/index.css'
import Select from 'rc-select'

import zhCN from 'rc-calendar/lib/locale/zh_CN'
import enUS from 'rc-calendar/lib/locale/en_US'

import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/en-gb'
import './calendar.less'

const format = 'YYYY-MM-DD'
const cn = location.search.indexOf('cn') !== -1

const now = moment()
if (cn) {
  now.locale('zh-cn').utcOffset(8)
} else {
  now.locale('en-gb').utcOffset(0)
}

const defaultCalendarValue = now.clone()
defaultCalendarValue.add(-1, 'month')

function onSelect (value) {
  console.log('select', value.format(format))
}
class Calendar extends Component {
  getInitialState () {
    return {
      type: 'month',
    }
  }
  onTypeChange (type) {
    this.setState({
      type,
    })
  }
  render () {
    return (
      <div className="calender" style={{ zIndex: 1000, position: 'relative', marginTop: 1 }}>
        <FullCalendar
          style={{ width: '100%', height: '100%', borderTop: 0, borderBottom: 0 }}
          Select={Select}
          fullscreen={false}
          onSelect={onSelect}
          defaultValue={now}
          locale={cn ? zhCN : enUS}
        />
      </div>
    )
  }
}

export default Calendar
