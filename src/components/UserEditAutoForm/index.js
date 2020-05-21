import React, { Component } from 'react';
import { Form, Select, DatePicker } from 'antd';

const { Option } = Select;

class EditUserAutoForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      insurance_status: this.props.data.insurance_status,
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
export default EditUserAutoForm;
