import React, { Component } from 'react'
import Timeline from './src/Timeline.js'
import './src/style.less'

class TimeLine extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: 0,
      events: [
        { time: '2017-05-22 17:30:10', text: 'Logged in', key: '21' },
        { time: '2017-05-22 17:30:10', text: 'Clicked Home Page', key: '22' },
        { time: '2017-05-22 17:30:10', text: 'Edited Profile', key: '23' },
        { time: '2017-05-22 17:30:10', text: 'Registred', key: '24' },
        { time: '2017-05-22 17:30:10', text: 'Clicked Cart', key: '52' },
        { time: '2017-05-22 17:30:10', text: 'Clicked Checkout', key: '62' },
      ],
    }
  }

  componentDidMount () {
    // 基于准备好的dom，初始化echarts实例
  }

  render () {
    return (
      <div>
        <Timeline timeArr={this.state.events} />
      </div>

    )
  }
}

export default TimeLine
