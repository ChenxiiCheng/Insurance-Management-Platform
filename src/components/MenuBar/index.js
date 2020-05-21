import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './style.scss';

const { SubMenu } = Menu;

class MenuBar extends Component {
  state = {
    current: 'user',
  };

  handleClick = (e) => {
    this.setState({
      current: e.target,
    });
    this.props.history.push(`/home/${e.key}`);
  };

  //color: '#314659'
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ color: '#fff', paddingTop: '16px' }}
        defaultSelectedKeys={['user']}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        // selectedKeys={[this.state.current]}
        mode="inline"
        theme="dark"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="setting" />
              <span>Admin User Panel</span>
            </span>
          }
        >
          <Menu.Item key="control">
            <Icon type="line-chart" />
            Data Analysis
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="team" />
              <span>Customer Panel</span>
            </span>
          }
        >
          <Menu.Item key="user">
            <Icon type="user" />
            User Info
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="bank" />
              <span>Insurances Management</span>
            </span>
          }
        >
          <Menu.ItemGroup key="houseInsu" title="Home Insurance">
            <Menu.Item key="house">
              <Icon type="property-safety" />
              Buy Insurance
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="autoInsu" title="Auto Insurance">
            <Menu.Item key="auto">
              <Icon type="car" />
              Buy Insurance
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(MenuBar);
