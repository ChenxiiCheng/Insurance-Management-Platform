import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Form, message } from 'antd';
import AdminEditAutoForm from '../AdminEditAutoForm';
import { updateAutoInsuById } from '../../services/insurance';

const AdminEditAutoFormComponent = Form.create({ name: 'edit_form' })(
  AdminEditAutoForm
);

class AdminEditAuto extends Component {
  editForm = null;
  handleEditUser = () => {
    this.editForm.validateFields((err, values) => {
      if (err) {
        message.error('Please provide valid information!');
      }
      // 提交表单
      // this.props.data
      let newAuto = { ...this.props.data, ...values };

      updateAutoInsuById(newAuto)
        .then((res) => {
          if (res.success === true) {
            message.success('Edit Success!');
            window.location.reload();
          }
        })
        .catch((err) => {
          message.error('Please try again...');
        });

      // updateHomeInsuById(newHome)
      //   .then((res) => {
      //     if (res.success === true) {
      //       message.success('Edit success!', 2);
      //       this.props.close();
      //       window.location.reload();
      //     }
      //   })
      //   .catch((err) => {
      //     message.error('Edit failed, please try again.', 2);
      //   });
    });
  };
  render() {
    return (
      <Modal
        title="Admin User Edit Auto Insurance Info"
        width={700}
        visible={this.props.visible}
        okText="Edit"
        cancelText="Cancel"
        onOk={this.handleEditUser}
        onCancel={() => this.props.close()}
        destroyOnClose={true}
      >
        <AdminEditAutoFormComponent
          ref={(form) => (this.editForm = form)}
          data={this.props.data}
        />
      </Modal>
    );
  }
}

export default withRouter(AdminEditAuto);
