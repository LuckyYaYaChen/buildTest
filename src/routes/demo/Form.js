import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Row, Col, Input, Select, DatePicker, Checkbox, Radio, Divider } from 'antd'
import { Page } from '../../components'

const { RangePicker } = DatePicker
const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group


const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}
const ColProps = {
  span: 8,
}

const FormDemo = ({ dispatch, form: {
  getFieldDecorator,
  // validateFields,
  // getFieldsValue,
} }) => {
  console.log(dispatch)
  const plainOptions = ['Apple', 'Pear', 'Orange']
  return (
    <Page inner>
      <Divider><h3>表单</h3></Divider>
      <Form layout="horizontal">
        <Row>
          <Col {...ColProps}>
            <FormItem label="报表组编码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('id', {
                initialValue: '',
                rules: [
                  {
                    required: false,
                    message: ' ',
                  },
                ],
              })(<Input disabled placeholder="报表分组编号" />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="报表分组名" hasFeedback {...formItemLayout}>
              {getFieldDecorator('groupName', {
                initialValue: '',
                rules: [
                  {
                    required: false,
                    message: ' ',
                  },
                ],
              })(<Input placeholder="报表分组名" />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="姓名" hasFeedback {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: ' ',
                  },
                ],
              })(<Select>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="日期" hasFeedback {...formItemLayout}>
              {getFieldDecorator('date', {
                initialValue: '',
                rules: [
                  {
                    required: false,
                    message: ' ',
                  },
                ],
              })(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="Range日期" hasFeedback {...formItemLayout}>
              {getFieldDecorator('Range', {
                initialValue: '',
                rules: [
                  {
                    required: false,
                    message: ' ',
                  },
                ],
              })(<RangePicker />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="checkBox" hasFeedback {...formItemLayout}>
              {getFieldDecorator('checkBox', {
                initialValue: [],
                rules: [
                  {
                    required: false,
                    message: ' ',
                  },
                ],
              })(<CheckboxGroup options={plainOptions} />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="radio" hasFeedback {...formItemLayout}>
              {getFieldDecorator('radio', {
                initialValue: '',
                rules: [
                  {
                    required: false,
                    message: ' ',
                  },
                ],
              })(<RadioGroup options={plainOptions} />)}
            </FormItem>
          </Col>

        </Row>
      </Form>
      <Button />
    </Page>
  )
}

FormDemo.propTypes = {
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

export default connect(({ login }) => ({ login }))(Form.create()(FormDemo))
