import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Card,
  Breadcrumb,
  Popconfirm,
  Icon,
  message,
  Descriptions,
  Badge,
  Divider,
  Spin,
  Alert,
} from 'antd';
import moment from 'moment';
import UserEditHome from '../../components/UserEditHome';
import UserEditAuto from '../../components/UserEditAuto';
import UserHomePayment from '../../components/UserHomePayment';

import { getLoginUserInsurances } from '../../services/auth';
import UserAutoPayment from '../../components/UserAutoPayment';

export default class UserInfo extends Component {
  state = {
    showAutoPayment: false,
    showHomePayment: false,
    showEditHome: false,
    showEditAuto: false,
    editUserRow: null,
    autoPaymentRow: null,
    homePaymentRow: null,
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
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Are you sure edit this item?"
              onConfirm={() => this.editHomeConfirm(record)}
              onCancel={this.editCancel}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                style={{ marginRight: '5px', marginBottom: '6px' }}
              >
                Edit
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Pay for this insurance?"
              onConfirm={() => this.handleClickPayment(record)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="danger">Payment</Button>
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
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Are you sure edit this item?"
              onConfirm={() => this.editAutoConfirm(record)}
              onCancel={this.editCancel}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="primary">Edit</Button>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title="Pay for this insurance?"
              onConfirm={() => this.paymetAutoConfirm(record)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="danger">Payment</Button>
            </Popconfirm>
          </span>
        ),
      },
    ],
    home: [],
    auto: [],
    loading: true,
    user: null,
  };

  componentDidMount() {
    getLoginUserInsurances()
      .then((res) => {
        if (res.success === true) {
          // 1.home类型处理数据中的时间转换
          if (res.home.length !== 0) {
            res.home.forEach((item) => {
              item.start_date = moment(item.start_date).format(
                'MMMM Do YYYY, h:mm:ss a'
              );
              item.end_date = moment(item.end_date).format(
                'MMMM Do YYYY, h:mm:ss a'
              );
              if (item.home_purchase_date) {
                item.home_purchase_date = moment(
                  item.home_purchase_date
                ).format('MMMM Do YYYY, h:mm:ss a');
              }
            });
          }
          if (res.auto.length !== 0) {
            res.auto.forEach((item) => {
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

          if (res.user.length !== 0) {
            res.user.created = moment(res.user.created).format(
              'MMMM do YYYY, h:mm:ss a'
            );
            res.user.updated = moment(res.user.updated).format(
              'MMMM do YYYY, h:mm:ss a'
            );
          }

          this.setState({
            home: res.home,
            auto: res.auto,
            loading: false,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        message.error('Please refresh page!');
      });
  }

  // Home付款
  handleClickPayment = (record) => {
    this.setState({ showHomePayment: true, homePaymentRow: record });
  };

  // Auto付款
  paymetAutoConfirm = (record) => {
    this.setState({ showAutoPayment: true, autoPaymentRow: record });
  };

  hideAutoPayment = () => {
    this.setState({ showAutoPayment: false });
  };

  // 编辑home类型保险
  editHomeConfirm = (record) => {
    this.setState({
      showEditHome: true,
      editUserRow: record,
    });
  };

  // 编辑auto类型保险
  editAutoConfirm = (record) => {
    this.setState({
      showEditAuto: true,
      editUserRow: record,
    });
  };

  editHomeCancel = () => {
    this.setState({ showEditHome: false });
  };

  // popover的cancel
  editCancel = () => {
    message.info('You clicked cancel...');
  };

  editAutoCancel = () => {
    this.setState({ showEditAuto: false });
  };

  hideEditUser = () => {
    this.setState({ showEditUser: false });
  };

  hideHomePayment = () => {
    this.setState({ showHomePayment: false });
  };

  render() {
    const { home, auto, user, loading } = this.state;
    return (
      <Fragment>
        {loading === true ? (
          <Spin tip="Loading...">
            <Alert
              message="Loading..."
              description="Please wait..."
              type="info"
            />
          </Spin>
        ) : (
          <Fragment>
            <Breadcrumb style={{ marginBottom: '12px' }}>
              <Breadcrumb.Item>
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/home/user">User Info</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Card>
              <Descriptions title="Personal Information">
                <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
                <Descriptions.Item label="Username">
                  {user.username}
                </Descriptions.Item>
                <Descriptions.Item label="User Role">
                  {user.role}
                </Descriptions.Item>
                <Descriptions.Item label="User Created At">
                  {user.created}
                </Descriptions.Item>
                <Descriptions.Item label="User Status">
                  <Badge status="processing" text="Processing" />
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card style={{ marginTop: '15px' }} title="Buy More Insurances">
              <Button
                type="primary"
                style={{ marginRight: '18px' }}
                onClick={() => {
                  this.props.history.push('/home/house');
                }}
              >
                Home Insurance
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  this.props.history.push('/home/auto');
                }}
              >
                Auto Insurance
              </Button>
            </Card>
            <Card
              style={{ marginTop: '15px' }}
              title="Purchased Home Insurance Records"
            >
              <Table
                columns={this.state.columnsHome}
                dataSource={home}
                rowKey="id"
              />
            </Card>
            <Card
              style={{ marginTop: '15px' }}
              title="Purchased Auto Insurance Records"
            >
              <Table
                columns={this.state.columnsAuto}
                dataSource={auto}
                rowKey="id"
              />
            </Card>
            <UserEditHome
              visible={this.state.showEditHome}
              close={this.editHomeCancel}
              data={this.state.editUserRow}
            />
            <UserEditAuto
              visible={this.state.showEditAuto}
              close={this.editAutoCancel}
              data={this.state.editUserRow}
            />
            <UserHomePayment
              visible={this.state.showHomePayment}
              close={this.hideHomePayment}
              data={this.state.homePaymentRow}
            />
            <UserAutoPayment
              visible={this.state.showAutoPayment}
              close={this.hideAutoPayment}
              data={this.state.autoPaymentRow}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
