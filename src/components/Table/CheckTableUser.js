import React, { PropTypes } from 'react'
import { Table } from 'antd'
import style from './radioTable.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

function CheckTable ({ loading, dataSource, pagination, columns, onPageChange, onChangeRadio, selectedRows }) {
  const getRowKey = (array) => {
    let arr = []
    array.forEach((item) => {
      arr.push(item.id)
    })
    return arr
  }
  const rowSelection = {
    type: 'checkbox',
    /*   onChange: (selectedRowKeys, selectedRow) => {
      onChangeRadio(selectedRow)
      operate(selectedRow)
    }, */
    selectedRowKeys: getRowKey(selectedRows),
    onSelect: (record, selected) => {
      onChangeRadio(record, selected)
      // operate(selectedRows)
    },
    onSelectAll: (selected, selecteRows, changeRows) => {
      onChangeRadio(selecteRows, selected, changeRows)
      // operate(selectedRows)
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  }
  /* 表格动画---start */
  const getBodyWrapperProps = {
    page: pagination.page,
    current: pagination.current,
  }
  const getBodyWrapper = body => <AnimTableBody {...getBodyWrapperProps} body={body} />
  /* 表格动画---end */
  return (
    <div style={{ marginBottom: 16 }}>
      <Table
        className={style.marsCheckTable}
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

CheckTable.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  selectedRows: PropTypes.array,
  pagination: PropTypes.object,
  columns: PropTypes.object,
  onPageChange: PropTypes.func,
  onChangeRadio: PropTypes.func,
}

export default CheckTable
