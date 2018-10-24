import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Modal } from 'antd'
import { browserHistory } from 'dva/router'
import { FormattedMessage } from 'react-intl'
// 引入locale配置文件，具体路径根据实际情况填写
import { isEmpty } from '../../../../../utils'


const FormItem = Form.Item
class LoanTypesButton extends React.Component {
  onAdd = () => {
    browserHistory.push('/sysConfig/serviceParams/loanTypes/detail')
  }

  onUpdate = () => {
    if (!isEmpty(this.props.selectedRows)) {
      browserHistory.push(`/sysConfig/serviceParams/loanTypes/detail?id=${this.props.selectedRows[0].id}`)
      this.props.dispatch({
        type: 'loanTypes/selectedRowClear',
        payload: {
          currentItem: [],
        },
      })
      this.props.dispatch({
        type: 'loanTypes/getCurrentItem',
        payload: {
          currentItem: this.props.selectedRows,
        },
      })
    } else {
      Modal.confirm({
        title: '警告',
        iconType: 'exclamation-circle-o',
        content: '请先选择一条记录!',

      })
    }
  }
  // 复制产品
  handleCopy = () => {
    this.props.dispatch({
      type: 'loanTypes/copyProShowModal',
    })
  }
  handleDel = () => {
    if (!isEmpty(this.props.selectedRows)) {
      Modal.confirm({
        title: '提示',
        iconType: 'exclamation-circle-o',
        content: '是否确认要删除？',
        onOk () {
          this.props.dispatch({
            type: 'loanTypes/delete',
            payload: this.props.selectedRows[0].id,
          })
        },
      })
    } else {
      Modal.confirm({
        title: '警告',
        iconType: 'exclamation-circle-o',
        content: '请先选择一条记录!',
        // okText: '确定',
      })
    }
  }
  checkComputationSet = () => { /* 核算设置 */
    if (!isEmpty(this.props.selectedRows)) {
      this.props.dispatch({
        type: 'loanTypes/checkShowModal',
        payload: {
          modalType: 'checkCptSet',
        },
      })
    } else {
      Modal.confirm({
        title: '警告',
        iconType: 'exclamation-circle-o',
        content: '请先选择一条记录!',
        // okText: '确定',
      })
    }
  }
  salesPromotionSet = () => { /* 促销设置 */
    if (!isEmpty(this.props.selectedRows)) {
      this.props.dispatch({
        type: 'loanTypes/salesPrtShowModal',
        payload: {
          modalType: 'salesPrt',
        },
      })
    } else {
      Modal.confirm({
        title: '警告',
        iconType: 'exclamation-circle-o',
        content: '请先选择一条记录!',
        // okText: '确定',
      })
    }
  }
  templetSet = () => { /* 模板设置 */
    if (!isEmpty(this.props.selectedRows)) {
      this.props.dispatch({
        type: 'templet/query', // model下的reducers方法处理
        payload: {
          typSeq: 'templet',
        },
      })
      this.props.dispatch({
        type: 'templet/templetModalShow', // model下的reducers方法处理
        payload: {
          modalType: 'templet',
        },
      })
    } else {
      Modal.confirm({
        title: '警告',
        iconType: 'exclamation-circle-o',
        content: '请先选择一条记录!',
        // okText: '确定',
      })
    }
  }
  loanTypExtSet = () => { // 其它设置
    if (!isEmpty(this.props.selectedRows)) {
      this.props.dispatch({
        type: 'loanTypExt/query', // model下的reducers方法处理
        payload: {
          typSeq: 'loanTypExt',
        },
      })
      this.props.dispatch({
        type: 'loanTypExt/loanTypExtModalShow', // model下的reducers方法处理
        payload: {
          modalType: 'loanTypExt',
        },
      })
    } else {
      Modal.confirm({
        title: '警告',
        iconType: 'exclamation-circle-o',
        content: '请先选择一条记录!',
        // okText: '确定',
      })
    }
  }
  feeRecord = () => { /* 费用设置 */
    if (!isEmpty(this.props.selectedRows)) {
      this.props.dispatch({
        type: 'feeRecord/query',
      })
      this.props.dispatch({
        type: 'feeRecord/showModal',
        payload: {
          modalType: 'feeRecord',
        },
      })
    } else {
      Modal.confirm({
        title: '警告',
        iconType: 'exclamation-circle-o',
        content: '请先选择一条记录!',
        okText: '确定',
      })
    }
  }

  loanTypeHistory = () => {
    browserHistory.push('/sysConfig/serviceParams/loanTypes/loanTypeHistory')
  }
  // 选取多条数据返回
  selectMore = () => {
    this.props.dispatch({
      type: 'selectMore/showModal',
    })
  }

  render () {
    const itemLayout = {
      size: 'small',
      type: 'ghost',
      style: {
        marginRight: '10px',
      },
    }
    return (
      <Col span={40} >
        <FormItem style={{ margin: '20px 20px' }}>
          <h4 style={{ display: 'inline-block' }}>贷款品种</h4>
          <div style={{ float: 'right' }}>

            <Button {...itemLayout} onClick={this.onAdd}>
              <FormattedMessage id="add" />
            </Button>
            <Button {...itemLayout} onClick={this.onUpdate}>
              <FormattedMessage id="update" />
            </Button>
            <Button {...itemLayout} onClick={this.handleDel}>删除</Button>
            <Button {...itemLayout} onClick={this.onAdd}>查看</Button>
            <Button {...itemLayout} onClick={this.handleCopy}>复制产品</Button>
            <Button {...itemLayout} onClick={this.checkComputationSet}>核算设置</Button>
            <Button {...itemLayout} onClick={this.salesPromotionSet}>促销设置</Button>
            <Button {...itemLayout} onClick={this.feeRecord}>费用设置</Button>
            <Button {...itemLayout} onClick={this.templetSet}>模板设置</Button>
            <Button {...itemLayout} onClick={this.loanTypExtSet}>其它设置</Button>
            <Button {...itemLayout} onClick={this.loanTypeHistory}>历史版本</Button>
            <Button {...itemLayout} onClick={this.onAdd}>失效</Button>
            <Button {...itemLayout} onClick={this.onAdd}>生效</Button>
            <Button {...itemLayout} onClick={this.selectMore}>多选</Button>
          </div>
        </FormItem>
      </Col>
    )
  }
}


LoanTypesButton.propTypes = {
  onAdd: PropTypes.func,
  selectedRows: PropTypes.array,
  onUpdate: PropTypes.func,
  dispatch: PropTypes.func,
  checkComputationSet: PropTypes.func, /* 核算设置 */
  salesPromotionSet: PropTypes.func, /* 促销设置 */
  templetSet: PropTypes.func, /* 模板设置 */
  loanTypExtSet: PropTypes.func, // 其它设置
}
export default LoanTypesButton
