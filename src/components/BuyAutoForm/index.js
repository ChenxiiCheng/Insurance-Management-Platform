import React, { Component } from 'react';
import { Form, Input, Icon, DatePicker, Select } from 'antd';
import { getUserInfo } from '../../utils/index';

const { Option } = Select;

class UserBuyAutoForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      username: getUserInfo().username,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                min: 2,
                message: 'Please at least 2 characters',
              },
              {
                required: true,
                message: 'Please input username',
              },
            ],
          })(
            <Input prefix={<Icon type="idcard" />} placeholder="Vehicle VIN" />
          )}
        </Form.Item>
        <Form.Item label="Customer Type">
          {getFieldDecorator('customer_type', {
            rules: [
              {
                required: true,
                message: 'Select customer type',
              },
            ],
          })(
            <Select style={{ width: 220 }} placeholder="Select Customer Type">
              <Option value="A">Auto</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Vehicle VIN">
          {getFieldDecorator('vehicle_vin', {
            rules: [
              {
                min: 5,
                message: 'Please enter at least 5 digits',
              },
              {
                required: true,
                message: 'Please enter vehicle VIN',
              },
            ],
          })(
            <Input prefix={<Icon type="idcard" />} placeholder="Vehicle VIN" />
          )}
        </Form.Item>

        <Form.Item label="Amount">
          {getFieldDecorator('amount', {
            rules: [
              {
                required: true,
                message: 'Please enter vehicle VIN',
              },
            ],
          })(
            <Input
              prefix={<Icon type="bank" />}
              placeholder="Please enter amount"
            />
          )}
        </Form.Item>

        <Form.Item label="Make Model Year">
          {getFieldDecorator('make_model_year', {
            rules: [
              {
                required: true,
                message: 'Please select auto make model year',
              },
            ],
          })(<DatePicker placeholder="Select Date" />)}
        </Form.Item>

        <Form.Item label="Status Of Vehicle">
          {getFieldDecorator('status_vehicle', {
            rules: [
              {
                required: true,
                message: 'Please provide status of vehicle',
              },
            ],
          })(
            <Select style={{ width: 200 }} placeholder="Status Of Vehicle">
              <Option value="L">Leased</Option>
              <Option value="F">Financed</Option>
              <Option value="O">Owned</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Insurance Start Date">
          {getFieldDecorator('start_date', {
            rules: [
              {
                required: true,
                message: 'Please select insurance start date',
              },
            ],
          })(<DatePicker placeholder="Select Start Date" />)}
        </Form.Item>

        <Form.Item label="Insurance End Date">
          {getFieldDecorator('end_date', {
            rules: [
              {
                required: true,
                message: 'Please select insurance end date',
              },
            ],
          })(<DatePicker placeholder="Select End Date" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default UserBuyAutoForm;
