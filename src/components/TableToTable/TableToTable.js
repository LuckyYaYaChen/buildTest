import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

const TableToTable = ({ approvalProgress, loading }) => {
  const { list } = approvalProgress
  // 第一栏显示的表头
  // 关联方信息-表头
  const cooprRelColAll = [
    {
      title: '合作机构代码',
      dataIndex: 'cooprSeq',
      key: 'cooprSeq',
    }, {
      title: '借据号',
      dataIndex: 'loanNo',
      key: 'loanNo',
    }, {
      title: '客户代码',
      dataIndex: 'custId',
      key: 'custId',
    }, {
      title: '客户姓名',
      dataIndex: 'custName',
      key: 'custName',
    }, {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    }, {
      title: '贷款金额(元)',
      dataIndex: 'loanAmtStr',
      key: 'loanAmtStr',
    }, {
      title: '贷款余额(元)',
      dataIndex: 'loanRestStr',
      key: 'loanRestStr',
    }, {
      title: '币种',
      dataIndex: 'curTyp',
      key: 'curTyp',
    }, {
      title: '放款日期',
      dataIndex: 'loanStartDt',
      key: 'loanStartDt',
    }, {
      title: '到期日期',
      dataIndex: 'loanEndDt',
      key: 'loanEndDt',
    }, {
      title: '资金来源',
      dataIndex: 'capitalSrc',
      key: 'capitalSrc',
    }, {
      title: '资产包代码',
      dataIndex: 'pkgCde',
      key: 'pkgCde',
    }, {
      title: '资产包名称',
      dataIndex: 'pkgName',
      key: 'pkgName',
    }, {
      title: '资产包金额（元）',
      dataIndex: 'pkgAmtStr',
      key: 'pkgAmtStr',
    }, {
      title: '资产数量（条）',
      dataIndex: 'pkgQty',
      key: 'pkgQty',
    },
  ]

  return (
    <Table
      bordered
      key={1}
      className="components-table-demo-nested"
      columns={cooprRelColAll}
      dataSource={list}
      loading={loading}
    />
  )
}


TableToTable.propTypes = {
  approvalProgress: PropTypes.object,
  loading: PropTypes.bool,
}

export default TableToTable
