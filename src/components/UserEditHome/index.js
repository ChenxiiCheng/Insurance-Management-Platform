import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Form, message } from 'antd';
import UserEditForm from '../UserEditHomeForm';
import { updateHomeInsuById } from '../../services/insurance';

const UserEditFormComponent = Form.create({ name: 'edit_form' })(UserEditForm);

class UserEditHome extends Component {
  editForm = null;
  handleEditUser = () => {
    this.editForm.validateFields((err, values) => {
      if (err) {
        message.error('Please provide valid information!');
      }
      // 提交表单
      // this.props.data
      let newUser = { ...this.props.data, ...values };

      updateHomeInsuById(newUser)
        .then((res) => {
          if (res.success === true) {
            message.success('Edit success!', 2);
            this.props.close();
            window.location.reload();
          }
        })
        .catch((err) => {
          message.error('Edit failed, please try again.', 2);
        });
    });
  };
  render() {
    return (
      <Modal
        title="Edit Home Insurance Info"
        width={700}
        visible={this.props.visible}
        okText="Edit"
        cancelText="Cancel"
        onOk={this.handleEditUser}
        onCancel={() => this.props.close()}
        destroyOnClose={true}
      >
        <UserEditFormComponent
          ref={(form) => (this.editForm = form)}
          data={this.props.data}
          type={this.props.type}
        />
      </Modal>
    );
  }
}

export default withRouter(UserEditHome);
