import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Form, message } from 'antd';
import AdminEditHomeForm from '../AdminEditHomeForm';
import { updateHomeInsuById } from '../../services/insurance';

const AdminEditHomeFormComponent = Form.create({ name: 'edit_form' })(
  AdminEditHomeForm
);

class AdminEditHome extends Component {
  editForm = null;
  handleEditUser = () => {
    this.editForm.validateFields((err, values) => {
      if (err) {
        message.error('Please provide valid information!');
      }
      // 提交表单
      // this.props.data
      let newHome = { ...this.props.data, ...values };

      console.log(newHome);

      updateHomeInsuById(newHome)
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
        title="Admin User Edit Home Insurance Info"
        width={700}
        visible={this.props.visible}
        okText="Edit"
        cancelText="Cancel"
        onOk={this.handleEditUser}
        onCancel={() => this.props.close()}
        destroyOnClose={true}
      >
        <AdminEditHomeFormComponent
          ref={(form) => (this.editForm = form)}
          data={this.props.data}
        />
      </Modal>
    );
  }
}

export default withRouter(AdminEditHome);
