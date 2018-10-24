import React from 'react'
import Header from './header'
import Report from './report'

const pageHome = () => {
  // 这里必须提前顶一个textInput，只有这样才可以正常执行ref回调函数
  return (
    <div className="content-inner" style={{ padding: '0', margin: '0px' }}>
      测试
    </div>
  )
}


export default pageHome

