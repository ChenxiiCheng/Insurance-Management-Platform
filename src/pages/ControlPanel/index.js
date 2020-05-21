import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Popconfirm,
  Button,
  Card,
  Table,
  Tag,
  Breadcrumb,
  Icon,
  message,
  Divider,
  Spin,
  Alert,
} from 'antd';
import moment from 'moment';
import { getAllRegisteredUser, adminDeleteUser } from '../../services/auth';
import {
  adminUserGetAllInsu,
  adminDeleteHomeInsu,
  adminDeleteAutoInsu,
} from '../../services/insurance';
import AdminEditUser from '../../components/AdminEditUser';
import AdminEditHome from '../../components/AdminEditHome';
import AdminEditAuto from '../../components/AdminEditAuto';
import StackChart from '../../components/StackChart';
import BarChart from '../../components/BarChart';

import './style.scss';

export default class ControlPanel extends Component {
  state = {
    showAdminEditAuto: false,
    showAdminEditUser: false,
    showAdminEditHome: false,
    editHomeRow: null,
    editUserRow: null,
    allUsers: null,
    homeInsus: [],
    autoInsus: [],
    loading: true,
    columnsUser: [
      {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Created At (Time)',
        dataIndex: 'created',
        key: 'created',
      },
      {
        title: 'Updated At (Time)',
        dataIndex: 'updated',
        key: 'updated',
      },
      {
        title: 'User Role',
        dataIndex: 'role',
        key: 'role',
        render: (role) => (
          <span>
            <Tag color={role === 'admin' ? 'red' : 'blue'} key={role}>
              {role + ' ' + 'user'}
            </Tag>
          </span>
        ),
      },
      {
        title: 'Operations',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Are you sure to EDIT this user?"
              onConfirm={() => this.editUserConfirm(record)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="primary">EDIT</Button>
            </Popconfirm>
            {/* <Divider type="vertical" /> */}
            {/* <Popconfirm
              title="Are you sure to DELETE this user?"
              onConfirm={() => this.deleteUserConfirm(record)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="danger">DELETE</Button>
            </Popconfirm> */}
          </span>
        ),
      },
    ],
    columnsHome: [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Customer Type',
        dataIndex: 'customer_type',
        key: 'customer_type',
      },
      {
        title: 'Status',
        dataIndex: 'insurance_status',
        key: 'insurance_status',
      },
      {
        title: 'Amount',
        dataIndex: 'premium_amount',
        key: 'premium_amount',
      },
      {
        title: 'Start Date',
        dataIndex: 'start_date',
        key: 'start_date',
      },
      {
        title: 'End Date',
        dataIndex: 'end_date',
        key: 'end_date',
      },
      {
        title: 'Home Purchase Date',
        dataIndex: 'home_purchase_date',
        key: 'home_purchase_date',
      },
      {
        title: 'Home Purchase Value',
        dataIndex: 'home_purchase_value',
        key: 'home_purchase_value',
      },
      {
        title: 'Home Area',
        dataIndex: 'home_area',
        key: 'home_area',
      },
      {
        title: 'Type of Home',
        dataIndex: 'type_home',
        key: 'type_home',
      },
      {
        title: 'Admin User Operations',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Are you sure to EDIT this user?"
              onConfirm={() => this.editHomeConfirm(record)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                style={{ marginRight: '6px', marginBottom: '5px' }}
              >
                EDIT
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure to DELETE this user?"
              onConfirm={() => this.deleteHomeConfirm(record)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="danger">DELETE</Button>
            </Popconfirm>
          </span>
        ),
      },
    ],
    columnsAuto: [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Customer Type',
        dataIndex: 'customer_type',
        key: 'customer_type',
      },
      {
        title: 'Status',
        dataIndex: 'insurance_status',
        key: 'insurance_status',
      },
      {
        title: 'Make Model Year',
        dataIndex: 'make_model_year',
        key: 'make_model_year',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Start Date',
        dataIndex: 'start_date',
        key: 'start_date',
      },
      {
        title: 'End Date',
        dataIndex: 'end_date',
        key: 'end_date',
      },
      {
        title: 'Admin User Operations',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Are you sure to EDIT this user?"
              onConfirm={() => this.editAutoConfirm(record)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="primary">EDIT</Button>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure to DELETE this user?"
              onConfirm={() => this.deleteAutoConfirm(record)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="danger">DELETE</Button>
            </Popconfirm>
          </span>
        ),
      },
    ],
  };

  componentWillMount() {
    getAllRegisteredUser()
      .then((res) => {
        if (res.msg === 'success') {
          res.data.forEach((item) => {
            item.created = moment(item.created).format(
              'MMMM Do YYYY, h:mm:ss a'
            );
            item.updated = moment(item.updated).format(
              'MMMM Do YYYY, h:mm:ss a'
            );
          });
          this.setState({
            allUsers: res.data,
          });
        }
      })
      .catch((err) => {
        message.error('Please try again..');
      });

    adminUserGetAllInsu().then((res) => {
      if (res.success === true) {
        // 1.home类型处理数据中的时间转换
        if (res.home.length !== 0) {
          res.home.forEach((item) => {
            item.customer_type = 'Home';
            item.premium_amount = item.premium_amount + '$';
            item.insurance_status = 'Current';
            item.start_date = moment(item.start_date).format(
              'MMMM Do YYYY, h:mm:ss a'
            );
            item.end_date = moment(item.end_date).format(
              'MMMM Do YYYY, h:mm:ss a'
            );
            if (item.home_purchase_date) {
              item.home_purchase_date = moment(item.home_purchase_date).format(
                'MMMM Do YYYY, h:mm:ss a'
              );
            }
          });
        }
        // auto类型时间的操作处理
        if (res.auto.length !== 0) {
          res.auto.forEach((item) => {
            item.customer_type = 'Auto';
            item.amount = item.amount + '$';
            item.insurance_status = 'Current';
            item.start_date = moment(item.start_date).format(
              'MMMM Do YYYY, h:mm:ss a'
            );
            item.end_date = moment(item.end_date).format(
              'MMMM Do YYYY, h:mm:ss a'
            );

            item.make_model_year = moment(item.make_model_year).format(
              'MMMM Do YYYY, h:mm:ss a'
            );
          });
        }

        this.setState({
          loading: false,
          homeInsus: res.home,
          autoInsus: res.auto,
        });
      }
    });
  }

  // 删除 User 操作
  deleteUserConfirm = (record) => {
    adminDeleteUser(record)
      .then((res) => {
        if (res.success === true) {
          message.success('Delete success!');
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error('You don not have permissions to DELETE user!');
      });
  };

  // 编辑 User 操作
  editUserConfirm = (record) => {
    this.setState({
      editUserRow: record,
      showAdminEditUser: true,
    });
  };

  // 隐藏User弹框
  hideAdminEditUser = () => {
    this.setState({ showAdminEditUser: false });
  };

  // 隐藏Home弹框
  adminEditHomeCancel = () => {
    this.setState({ showAdminEditHome: false });
  };

  // 编辑Home操作
  editHomeConfirm = (record) => {
    this.setState({ showAdminEditHome: true, editHomeRow: record });
  };

  // 删除Home操作
  deleteHomeConfirm = (record) => {
    adminDeleteHomeInsu(record)
      .then((res) => {
        if (res.success === true) {
          message.success('Delete Success!', 1.5);
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error('Please try again...');
      });
  };

  // 编辑Auto操作
  editAutoConfirm = (record) => {
    console.log(record);
    this.setState({
      showAdminEditAuto: true,
      editAutoRow: record,
    });
  };

  // 删除 Auto 操作
  deleteAutoConfirm = (record) => {
    adminDeleteAutoInsu(record)
      .then((res) => {
        if (res.success === true) {
          message.success('Delete Success!', 1.5);
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error('Please try again...');
      });
  };

  // 隐藏Auto操作
  adminEditAutoCancel = () => {
    this.setState({ showAdminEditAuto: false });
  };

  render() {
    return (
      <Fragment>
        {this.state.loading === true ? (
          <Spin tip="Loading...">
            <Alert
              message="Loading..."
              description="Please wait..."
              type="info"
            />
          </Spin>
        ) : (
          <Fragment>
            <div className="panel-content">
              {/* 面包屑 */}
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/home/control">Control Panel</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              {/* 销售额
          <div className="panel-top">
            <PanelTopItem />
            <PanelTopItem />
            <PanelTopItem />
            <PanelTopItem />
          </div> */}
              <Card title="Data Analysis" style={{ marginTop: '15px' }}>
                <div className="chart-wrapper">
                  <StackChart />
                  <BarChart />
                </div>
              </Card>
              <Card title="All Registered Users" style={{ marginTop: '15px' }}>
                <Table
                  rowKey="id"
                  dataSource={this.state.allUsers}
                  columns={this.state.columnsUser}
                />
              </Card>

              <Card
                title="All Home Insurances Purchase Records"
                style={{ marginTop: '15px' }}
              >
                <Table
                  rowKey="id"
                  dataSource={this.state.homeInsus}
                  columns={this.state.columnsHome}
                />
              </Card>

              <Card
                title="All Auto Insurances Purchase Records"
                style={{ marginTop: '15px' }}
              >
                <Table
                  rowKey="id"
                  dataSource={this.state.autoInsus}
                  columns={this.state.columnsAuto}
                />
              </Card>
            </div>
            <AdminEditUser
              visible={this.state.showAdminEditUser}
              close={this.hideAdminEditUser}
              data={this.state.editUserRow}
            />
            <AdminEditHome
              visible={this.state.showAdminEditHome}
              close={this.adminEditHomeCancel}
              data={this.state.editHomeRow}
            />
            <AdminEditAuto
              visible={this.state.showAdminEditAuto}
              close={this.adminEditAutoCancel}
              data={this.state.editAutoRow}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
