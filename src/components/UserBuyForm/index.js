import React, { Component } from 'react';
import { Form, Input, Icon, DatePicker, Select, Checkbox } from 'antd';
import { getUserInfo } from '../../utils/index';

const { Option } = Select;
const plainOptions = [
  'Auto Fire Notification',
  'Home Security System',
  'Basement',
];

class EditUserForm extends Component {
  componentDidMount() {
    const firstName = getUserInfo().username;
    this.props.form.setFieldsValue({
      firstName: firstName,
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
        <Form.Item label="FirstName">
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Please enter firstname',
              },
            ],
          })(<Input prefix={<Icon type="user" />} placeholder="FirstName" />)}
        </Form.Item>
        <Form.Item label="LastName">
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please enter lastname',
              },
            ],
          })(<Input prefix={<Icon type="user" />} placeholder="LastName" />)}
        </Form.Item>
        <Form.Item label="Gender">
          {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: 'Gender: M(male), F(female)',
              },
            ],
          })(
            <Select style={{ width: 200 }} placeholder="Select Gender">
              <Option value="M">Male</Option>
              <Option value="F">Female</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Marital Status">
          {getFieldDecorator('marital_status', {
            rules: [
              {
                required: true,
                message: 'Marital Status: M(Married), S(Single), W(Widow)',
              },
            ],
          })(
            <Select style={{ width: 200 }} placeholder="Select Marital Status">
              <Option value="M">Married</Option>
              <Option value="S">Single</Option>
              <Option value="W">Window / Windower</Option>
            </Select>
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
            <Select style={{ width: 200 }} placeholder="Select Customer Type">
              <Option value="H">Home</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Address">
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Please provide home address',
              },
            ],
          })(<Input prefix={<Icon type="idcard" />} placeholder="Address" />)}
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

        <Form.Item label="Premium Amount Factors">
          {getFieldDecorator('factors', {
            rules: [
              {
                required: true,
                message: 'Please select items',
              },
            ],
          })(<Checkbox.Group options={plainOptions} />)}
        </Form.Item>

        <Form.Item label="Swimming Pool">
          {getFieldDecorator('swimming_pool', {
            rules: [
              {
                required: true,
                message: 'Please provide information',
              },
            ],
          })(
            <Select style={{ width: 250 }} placeholder="Swimming Pool">
              <Option value="U">Underground Swimming Pool</Option>
              <Option value="O">Overground Swimming Pool</Option>
              <Option value="I">Indoor Swimming Pool</Option>
              <Option value="M">Multiple Swimming Pool</Option>
              <Option value="N">Null</Option>
            </Select>
          )}
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
export default EditUserForm;
