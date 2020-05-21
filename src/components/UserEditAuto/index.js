import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Form, message } from 'antd';
import EditUserAutoForm from '../UserEditAutoForm';
import { updateAutoInsuById } from '../../services/insurance';

const EditUserAutoFormComponent = Form.create({ name: 'edit_form' })(
  EditUserAutoForm
);

class UserEdit extends Component {
  editForm = null;
  handleEditUser = () => {
    this.editForm.validateFields((err, values) => {
      if (err) {
        message.error('Please provide valid information!');
      }
      // 提交表单
      // this.props.data
      let newUser = { ...this.props.data, ...values };

      updateAutoInsuById(newUser)
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
        title="Edit Auto Insurance Info"
        width={700}
        visible={this.props.visible}
        okText="Edit"
        cancelText="Cancel"
        onOk={this.handleEditUser}
        onCancel={() => this.props.close()}
        destroyOnClose={true}
      >
        <EditUserAutoFormComponent
          ref={(form) => (this.editForm = form)}
          data={this.props.data}
        />
      </Modal>
    );
  }
}

export default withRouter(UserEdit);
