import React from 'react'
import { config } from '../../utils'
import styles from './index.less'

const Error = () => (<div className="content-inner">
  <div className={styles.error}>
    <img alt={'build'} src={config.build} />
  </div>
</div>)

export default Error
