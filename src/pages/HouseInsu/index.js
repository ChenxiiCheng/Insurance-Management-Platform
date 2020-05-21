import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  Icon,
  Descriptions,
  Card,
  Table,
  Badge,
  Button,
  message,
} from 'antd';
import moment from 'moment';
import UserBuy from '../../components/UserBuy';
import { getLoginUserInsurances } from '../../services/auth';

export default class HouseInsu extends Component {
  state = {
    home: null,
    showUserBuyModal: false,
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
    ],
  };

  componentDidMount() {
    getLoginUserInsurances()
      .then((res) => {
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
                item.home_purchase_date = moment(
                  item.home_purchase_date
                ).format('MMMM Do YYYY, h:mm:ss a');
              }
            });
          }

          this.setState(
            {
              home: res.home,
              loading: false,
            },
            () => message.success('Loading success!', 1)
          );
        }
      })
      .catch((err) => {
        message.error('Please refresh page!');
      });
  }

  handleUserBuyClick = () => {
    this.setState({ showUserBuyModal: true });
  };

  close = () => {
    this.setState({ showUserBuyModal: false });
  };

  render() {
    const { home } = this.state;
    return (
      <Fragment>
        {/* 面包屑 */}
        <Breadcrumb style={{ marginBottom: '12px' }}>
          <Breadcrumb.Item>
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/auto">Home Insurance</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Descriptions title="Home Insurance Info" bordered>
            <Descriptions.Item label="Insurance Name">
              Home Insurance
            </Descriptions.Item>
            <Descriptions.Item label="Insurance Type">
              NEW 2020 Home Insurance
            </Descriptions.Item>
            <Descriptions.Item label="Cover Home Type">
              Single Family | Multi Family | Condominium | Town House
            </Descriptions.Item>
            <Descriptions.Item label="Insurance Version">
              <Badge dot offset={[2, 0]}>
                2020
              </Badge>
            </Descriptions.Item>
            <Descriptions.Item label="Insurance Status">
              <Badge status="processing" text="Opening" />
            </Descriptions.Item>
            <Descriptions.Item label="Factos Will Determine Premium Amount">
              Auto Fire Notification | Home Security Notification | Swimming
              Pool | Basement
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="Purchase Home Insurance" style={{ marginTop: '15px' }}>
          <Button type="primary" onClick={this.handleUserBuyClick}>
            Purchase Now
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
        <UserBuy visible={this.state.showUserBuyModal} close={this.close} />
      </Fragment>
    );
  }
}
