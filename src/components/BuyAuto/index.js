import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Form, message } from 'antd';
import BuyAutoForm from '../BuyAutoForm';
import { createAutoInsu } from '../../services/insurance';

const UserBuyAutoFormComponent = Form.create({ name: 'buy_form' })(BuyAutoForm);

class BuyAuto extends Component {
  buyForm = null;
  handleUserBuy = () => {
    this.buyForm.validateFields((err, values) => {
      if (err) {
        message.error('Please provide valid information!');
      }

      console.log(values);
      // 提交表单
      createAutoInsu(values)
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
        title="Purchase Auto Insurance"
        width={700}
        visible={this.props.visible}
        okText="Edit"
        cancelText="Cancel"
        onOk={this.handleUserBuy}
        onCancel={() => this.props.close()}
        destroyOnClose={true}
      >
        <UserBuyAutoFormComponent
          ref={(form) => (this.buyForm = form)}
          data={this.props.data}
        />
      </Modal>
    );
  }
}

export default withRouter(BuyAuto);
