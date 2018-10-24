/* global document */
import React from 'react'
import { Input, Select, Col, Checkbox, Radio, Form, Cascader, InputNumber, DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
}
const formItemLayout1 = {
  labelCol: { span: 9 },
}
const listProps = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 8 },
  lg: { span: 6 },
  xl: { span: 6 },
}

/* 限制选择的月份在三个月之内
const disabledDate = (current) => {
  // Can not select days before today and today
  // return current && current.valueOf() < moment().subtract(3, 'months') || current.valueOf() > Date.now()
  return current && current.valueOf() > Date.now()
}
*/
/**
 * Created by wangrui on 2017/4/26.
 *
 * 处理表单搜索选项
 * @param type input select checkbox radio
 * @param getFieldDecorator antd获取表单值得工具函数
 * @returns {Array}
 */

function formFocus (type, getFieldDecorator) {
  const childInput = []
  if (type.length !== 0) {
    type.forEach((item, i) => {
      if (item.searchType === 'input') {
        childInput.push(
          <Col {...listProps} key={i}>
            <FormItem {...formItemLayout} label={`${item.title}`}>
              {getFieldDecorator(item.dataIndex, {
                initialValue: item.value || '',
                rules: [
                  {
                    required: item.required || false,
                    message: item.title || '',
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'select') {
        childInput.push(
          <Col {...listProps} key={i}>
            <FormItem {...formItemLayout} validateStatus={item.validateStatus} label={`${item.title}`} >
              {getFieldDecorator(item.dataIndex, {
                // initialValue: item.value || '',
                rules: [
                  {
                    required: item.required || false,
                    message: item.title || '',
                  },
                ],
              })(
                <Select
                  className="select-1-single"
                  showSearch
                  allowClear
                  getPopupContainer={() => document.getElementById('selectContainer')}
                  placeholder={item.title}
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    return option.props.children.indexOf(input) >= 0
                  }}
                  onFocus={() => item.onChangeFunc()}
                >
                  {
                    item.selectOptions.map(index => <Select.Option value={index.value} key={index.value}>{index.name || index.value}</Select.Option>)
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'checkbox') {
        childInput.push(
          <Col {...listProps} key={i}>
            <FormItem {...formItemLayout} label={item.title}>
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: item.value || '生效',
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(<CheckboxGroup options={item.plainOptions} />)}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'radio') {
        childInput.push(
          <Col {...listProps} key={i}>
            <FormItem {...formItemLayout} label={item.title} >
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: item.value || '',
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(<RadioGroup options={item.plainOptions} />)}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'cascader') {
        childInput.push(
          <Col {...listProps} key={i}>
            <FormItem {...formItemLayout} label={item.title}>
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: item.value,
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(<Cascader options={item.plainOptions} />)}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'date-picker') {
        childInput.push(
          <Col {...listProps} key={i}>
            <FormItem {...formItemLayout} label={item.title} >
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: moment(item.value),
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(<DatePicker format="YYYY-MM-DD" getPopupContainer={() => document.getElementById('selectContainer')} />)}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'RangePicker') {
        childInput.push(
          <Col {...listProps} key={i}>
            <FormItem {...formItemLayout} label={item.title} >
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: [moment().subtract(6, 'months'), moment()],
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(<RangePicker getCalendarContainer={() => document.getElementById('selectContainer')} ranges={{ 今天: [moment(), moment()], 一周内: [moment().subtract(1, 'week'), moment()], 一个月内: [moment().subtract(1, 'months'), moment()], 最近三个月: [moment().subtract(3, 'months'), moment()] }} placeholder="" />)}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'input-input') {
        childInput.push(
          <Col {...listProps} key={i}>
            <div className="input-input">
              <FormItem {...formItemLayout1} label={item.title} >
                {getFieldDecorator(item.dataIndex1,
                  {
                    rules: [
                      {
                        required: item.required || false,
                        message: item.title || '',
                        // pattern: /^[0-9]*$/,
                      },
                    ],
                  })(<div><Input id="tel2" ref={item.dataIndex1} /><div className="input-input-range" /></div>)}
              </FormItem>
              <FormItem >
                {getFieldDecorator(item.dataIndex2,
                  {
                    rules: [
                      {
                        required: item.required || false,
                        message: item.title || '',
                        // pattern: /^[0-9]*$/,
                      },
                    ],
                  })(<div><Input id="tel2" /></div>)}
              </FormItem>
            </div>
          </Col>
        )
      } else if (item.searchType === 'inputNum-inputNum') {
        childInput.push(
          <Col {...listProps} key={i}>
            <div className="input-input">
              <FormItem {...formItemLayout1} label={item.title} >
                {getFieldDecorator(item.dataIndex1,
                  {
                    rules: [
                      {
                        required: item.required || false,
                        message: item.title || '',
                      },
                    ],
                  })(<div><InputNumber id="tel2" /><div className="input-input-range">至</div></div>)}
              </FormItem>
              <FormItem >
                {getFieldDecorator(item.dataIndex2,
                  {
                    rules: [
                      {
                        required: item.required || false,
                        message: item.title || '',
                      },
                    ],
                  })(<div><InputNumber min={0} id="tel2" /></div>)}
              </FormItem>
            </div>
          </Col>
        )
      }
    })
  }
  return childInput
}
export default formFocus
