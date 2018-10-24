import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

class TableLoadTable extends Component {
  componentDidMount () {

  }
  componentDidUpdate () {

  }
  render () {
    const { list, pagination } = this.props.approvalProgress
    const { loading, onPageChange, columns, onChangeRadio, tableKey } = this.props
    const rowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRow) => {
        onChangeRadio(selectedRow)
        // console.log(selectedRow)
        // selectedRows = selectedRow
      },
    }
    // console.log(tableKey)
    return (
      <div className="tableLoadTable">
        <Table
          size="small"
          bordered
          key={tableKey}
          rowKey={record => record.applSeq}
          scroll={{ x: 2300 }}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={list}
          loading={loading}
          pagination={pagination}
          onChange={onPageChange}
        />
      </div>
    )
  }
}
TableLoadTable.propTypes = {
  approvalProgress: PropTypes.object,
  loading: PropTypes.bool,
  onPageChange: PropTypes.func,
  onChangeRadio: PropTypes.func,
  columns: PropTypes.array,
  tableKey: PropTypes.string,
}

export default TableLoadTable
