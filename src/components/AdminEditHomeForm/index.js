import React, { Component } from 'react';
import { Form, Input, Icon, Select, DatePicker } from 'antd';

const { Option } = Select;

class AdminEditHomeForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      insurance_status: this.props.data.insurance_status,
      home_purchase_value: this.props.data.home_purchase_value,
      home_area: this.props.data.home_area,
      type_home: this.props.data.type_home,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="Insurance Status">
          {getFieldDecorator('insurance_status', {
            rules: [
              {
                required: true,
                message: 'Please select insurance status',
              },
            ],
          })(
            <Select style={{ width: 200 }} placeholder="Insurance Status">
              <Option value="C">Current</Option>
              <Option value="P">Pass</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Start Date">
          {getFieldDecorator('start_date', {
            rules: [
              {
                required: true,
                message: 'Please select insurance start date',
              },
            ],
          })(<DatePicker placeholder="Select Start Date" />)}
        </Form.Item>

        <Form.Item label="End Date">
          {getFieldDecorator('end_date', {
            rules: [
              {
                required: true,
                message: 'Please select insurance end date',
              },
            ],
          })(<DatePicker placeholder="Select End Date" />)}
        </Form.Item>

        <Form.Item label="Home Purchase Date">
          {getFieldDecorator('home_purchase_date', {
            rules: [
              {
                required: true,
                message: 'Please enter home purchase date',
              },
            ],
          })(<DatePicker placeholder="Select Buy Date" />)}
        </Form.Item>

        <Form.Item label="Home Value">
          {getFieldDecorator('home_purchase_value', {
            rules: [
              {
                required: true,
                message: 'Please enter home purchase value (number)',
              },
            ],
          })(
            <Input
              prefix={<Icon type="money-collect" />}
              placeholder="Home Value"
            />
          )}
        </Form.Item>

        <Form.Item label="Home Area">
          {getFieldDecorator('home_area', {
            rules: [
              {
                required: true,
                message: 'Please enter home area (number)',
              },
            ],
          })(
            <Input prefix={<Icon type="pie-chart" />} placeholder="Home Area" />
          )}
        </Form.Item>

        <Form.Item label="Type of Home">
          {getFieldDecorator('type_home', {
            rules: [
              {
                required: true,
                message: 'Type: S(Single), M(Mutli), C(Condominium), T(Town)',
              },
            ],
          })(
            <Select style={{ width: 200 }} placeholder="Select Home Type">
              <Option value="S">Single Family</Option>
              <Option value="M">Multi Family</Option>
              <Option value="C">Condominium</Option>
              <Option value="T">Town House</Option>
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}
export default AdminEditHomeForm;
