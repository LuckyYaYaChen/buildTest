import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Col, Row, Button } from 'antd'
import { LoanTypesButton, SearchCaxs, RadioTable } from './components'


import { Search } from '../../../../components'


function LoanType ({ location, dispatch, loanTypes, loading, field, keyword }) {
  // 动态生成表单数据
  const searchColums = [
    {
      title: '贷款品种代码',
      dataIndex: 'typCde',
      searchType: 'input',
      value: '1',
      required: false,
    }, {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
      searchType: 'input',
      value: '1',
    }, {
      title: '贷款类型',
      dataIndex: 'typGrp',
      searchType: 'select',
      value: '1',
      selectOptions: [
        { value: '汽车消费贷款', name: '汽车消费贷款' },
        { value: '一般消费贷款', name: '一般消费贷款' },
        { value: '耐用消费品贷款', name: '耐用消费品贷款' },
      ],
    }, {
      title: '状态',
      dataIndex: 'typSts',
      searchType: 'radio',
      value: '0',
      plainOptions: [
        { label: '生效', value: '0' },
        { label: '失效', value: '1' },
        { label: '待生效', value: '2' },
      ],
    }, {
      title: '状态',
      dataIndex: 'typSts111',
      searchType: 'checkbox',
      value: '0',
      plainOptions: [
        { label: '生效', value: '0' },
        { label: '失效', value: '1' },
        { label: '待生效', value: '2' },
      ],
    }, {
      title: '地址',
      dataIndex: 'address',
      searchType: 'cascader',
      value: ['zhejiang', 'hangzhou', 'xihu'],
      plainOptions: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{
              value: 'xihu',
              label: 'West Lake',
            }],
          }],
        }, {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [{
            value: 'nanjing',
            label: 'Nanjing',
            children: [{
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            }],
          }],
        }],
    }, {
      title: '时间',
      dataIndex: 'time',
      searchType: 'date-picker',
      value: '2017-07-06',

    },
  ]
  /* // 动态生成表单数据
  const searchColums = [
    {
      title: '贷款品种代码',
      dataIndex: 'typCde',
      searchType: 'input',
    }, {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
      searchType: 'input',
    }, {
      title: '贷款类型',
      dataIndex: 'typGrp',
      searchType: 'select',
      selectOptions: [
        { value: '汽车消费贷款', name: '汽车消费贷款' },
        { value: '一般消费贷款', name: '一般消费贷款' },
        { value: '耐用消费品贷款', name: '耐用消费品贷款' },
      ],
    }, {
      title: '状态',
      dataIndex: 'typSts',
      searchType: 'radio',
      plainOptions: [
        { label: '生效', value: '0' },
        { label: '失效', value: '1' },
        { label: '待生效', value: '2' },
      ],
    },
  ] */
  // 表头信息
  const columns = [
    {
      title: '贷款品种代码',
      dataIndex: 'typCde',
    }, {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
    }, {
      title: '贷款类型',
      dataIndex: 'typGrp',
    }, {
      title: '生效日期',
      dataIndex: 'startDt',
    }, {
      title: '状态',
      render: (item) => {
        let dataItem = ''
        if (item.typSts === '0') {
          dataItem = '生效'
        } else if (item.typSts === '1') {
          dataItem = '失效'
        } else if (item.typSts === '2') {
          dataItem = '待生效'
        }
        return dataItem
      },
    },
  ]
  // loanTypes model 关联数据
  const { list, pagination, isMotion, selectedRows, changeBtn } = loanTypes


  // 条件查询  form 表单 props
  const LoanTypeFilterProps = {
    onSearch (fieldsValue) {
      const { pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: fieldsValue,
      }))
    },
    searchColums,
  }
  // 表格 list props
  const LoanTypeListProps = {
    dataSource: list,
    loading,
    pagination,
    isMotion,
    columns,
    selectedRows,
    onChangeRadio (selectedRow) {
      dispatch({
        type: 'loanTypes/selectedRow',
        payload: {
          selectedRows: selectedRow,
        },
      })
    },
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
  }
  // 表格数据操作按钮 LoanTypesButton
  const LoanTypesButtonProps = { selectedRows, dispatch }
  // 简单搜索/高级搜索
  const handleChangeType = () => {
    dispatch({
      type: 'loanTypes/changeBtnType',
      payload: {
        changeBtn,
      },
    })
  }
  // 高级搜索
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [
      { value: 'typDesc', name: '贷款品种描述', titVal: 'typDesc' },
      { value: 'typCde', name: '贷款品种代码', titVal: 'typCde' },
      { value: 'all', name: '所有条件' },
    ],
    selectProps: {
      defaultValue: field || '贷款品种描述',
    },
    onSearch (fieldsValue) {
      dispatch(routerRedux.push({
        pathname: '/sysConfig/serviceParams/loanTypes',
        query: fieldsValue,
      }))
    },
  }
  return (
    <div className="content-inner">
      <div>
        <h4>输入查询条件
          <Button type="primary" style={{ float: 'right' }} onClick={handleChangeType}>
            {changeBtn ? '高级搜索' : '简单搜索'}
          </Button>
        </h4><br />
        <div className="ant-advanced-search-form">
          {
            changeBtn ? <Row>
              <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
                <Search {...searchGroupProps} />
              </Col>
            </Row> : <SearchCaxs {...LoanTypeFilterProps} />
          }
        </div>
      </div>
      <LoanTypesButton {...LoanTypesButtonProps} />
      <RadioTable {...LoanTypeListProps} />
    </div>
  )
}

LoanType.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  location: PropTypes.object,
  loanTypes: PropTypes.object,
  field: PropTypes.string,
  keyword: PropTypes.string,
}

export default connect(
  ({ loanTypes, loading, language }) => (
    { loanTypes, loading: loading.models.loanTypes, language }
  ))(LoanType)
