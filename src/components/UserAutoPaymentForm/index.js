import React, { Component } from 'react';
import { Form, Input, Icon, DatePicker } from 'antd';

class UserAutoPaymentForm extends Component {
  componentDidMount() {
    const { amount } = this.props.data;
    this.props.form.setFieldsValue({
      payment_amount: amount,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="horizontal"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 15 }}
      >
        <Form.Item label="Payment Date">
          {getFieldDecorator('payment_date', {
            rules: [
              {
                required: true,
                message: 'Please select payment date',
              },
            ],
          })(<DatePicker placeholder="Payment Date" />)}
        </Form.Item>

        <Form.Item label="Payment Amount">
          {getFieldDecorator('payment_amount', {
            rules: [
              {
                required: true,
                message: 'Please enter payment amount (number)',
              },
            ],
          })(
            <Input
              prefix={<Icon type="bank" />}
              placeholder="Payment Account"
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}
export default UserAutoPaymentForm;
