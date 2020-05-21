import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';

class AdminEditUserForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      username: this.props.data.username,
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
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please provide username',
              },
            ],
          })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default AdminEditUserForm;
