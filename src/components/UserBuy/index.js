import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Form, message } from 'antd';
import UserBuyForm from '../UserBuyForm';
import { createInsu } from '../../services/insurance';
// import { updateInsuById } from '../../services/insurance';

const UserBuyFormComponent = Form.create({ name: 'buy_form' })(UserBuyForm);

class UserBuy extends Component {
  buyForm = null;
  handleUserBuy = () => {
    this.buyForm.validateFields((err, values) => {
      if (err) {
        message.error('Please provide valid information!');
      }

      // 提交表单
      createInsu(values)
        .then((res) => {
          if (res.success === true) {
            message.success('Purchased success!');
            window.location.reload();
          }
        })
        .catch((err) => {
          message.error('Purchased failed, please try again..');
        });
    });
  };
  render() {
    return (
      <Modal
        title="Purchase Home Insurance"
        width={780}
        visible={this.props.visible}
        okText="Edit"
        cancelText="Cancel"
        onOk={this.handleUserBuy}
        onCancel={() => this.props.close()}
        destroyOnClose={true}
      >
        <UserBuyFormComponent
          ref={(form) => (this.buyForm = form)}
          data={this.props.data}
        />
      </Modal>
    );
  }
}

export default withRouter(UserBuy);
