import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Form, message } from 'antd';
import UserAutoPaymentForm from '../UserAutoPaymentForm';
import { createHomePayment } from '../../services/invoice';

const UserAutoPaymentComponent = Form.create({ name: 'buy_form' })(
  UserAutoPaymentForm
);

class UserAutoPayment extends Component {
  buyForm = null;
  handleUserBuy = () => {
    this.buyForm.validateFields((err, values) => {
      if (err) {
        message.error('Please provide valid information!');
      }

      const newData = { ...this.props.data, ...values };

      createHomePayment(newData)
        .then((res) => {
          if (res.success === true) {
            message.success('Payment Success!', 2);
            this.props.close();
          }
        })
        .catch((err) => {
          message.error('Please try again...');
        });
    });
  };
  render() {
    return (
      <Modal
        title="Payment"
        width={600}
        visible={this.props.visible}
        okText="Edit"
        cancelText="Cancel"
        onOk={this.handleUserBuy}
        onCancel={() => this.props.close()}
        destroyOnClose={true}
      >
        <UserAutoPaymentComponent
          ref={(form) => (this.buyForm = form)}
          data={this.props.data}
        />
      </Modal>
    );
  }
}

export default withRouter(UserAutoPayment);
