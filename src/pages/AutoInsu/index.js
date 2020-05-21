import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  Icon,
  Descriptions,
  Card,
  Table,
  Button,
  Badge,
  message,
} from 'antd';
import moment from 'moment';
import BuyAuto from '../../components/BuyAuto';
import { getLoginUserInsurances } from '../../services/auth';

export default class AutoInsu extends Component {
  state = {
    showUserBuyModal: false,
    auto: null,
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
    ],
  };

  componentDidMount() {
    getLoginUserInsurances()
      .then((res) => {
        if (res.success === true) {
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

          this.setState(
            {
              auto: res.auto,
            },
            () => message.success('Loading success!', 1)
          );
        }
      })
      .catch((err) => {
        message.error('Please refresh page!');
      });
  }

  hideUserBuy = () => {
    this.setState({ showUserBuyModal: false });
  };

  handleUserBuyClick = () => {
    this.setState({ showUserBuyModal: true });
  };

  render() {
    return (
      <Fragment>
        {/* 面包屑 */}
        <Breadcrumb style={{ marginBottom: '12px' }}>
          <Breadcrumb.Item>
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/auto">Auto Insurance</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Descriptions title="Auto Insurance Info" bordered>
            <Descriptions.Item label="Insurance Name">
              Auto Insurance
            </Descriptions.Item>
            <Descriptions.Item label="Insurance Type">
              NEW 2020 Auto Insurance
            </Descriptions.Item>
            <Descriptions.Item label="Cover Home Type">
              All Type Of Auto
            </Descriptions.Item>
            <Descriptions.Item label="Insurance Version">
              <Badge dot offset={[2, 0]}>
                2020
              </Badge>
            </Descriptions.Item>
            <Descriptions.Item label="Insurance Status">
              <Badge status="processing" text="Opening" />
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="Purchase Auto Insurance" style={{ marginTop: '15px' }}>
          <Button type="danger" onClick={this.handleUserBuyClick}>
            Purchase Now
          </Button>
        </Card>

        <Card title="User Purchase Record" style={{ marginTop: '15px' }}>
          <Table
            rowKey="id"
            dataSource={this.state.auto}
            columns={this.state.columnsAuto}
          />
        </Card>

        <BuyAuto
          visible={this.state.showUserBuyModal}
          close={this.hideUserBuy}
        />
      </Fragment>
    );
  }
}
