import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {
  Layout,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Tooltip,
  Badge,
  Input,
  Popover,
  Tabs,
  List,
  Modal,
  message,
} from 'antd';
import MenuBar from '../../components/MenuBar';
import ControlPanel from '../ControlPanel';
import UserInfo from '../UserInfo';
import HouseInsu from '../HouseInsu';
import AutoInsu from '../AutoInsu';
import Logo from '../../utils/imgs/web-logo.png';
import myAvatar from '../../utils/imgs/myAvatar.jpg';
import { userLogout, getUserInfo, isAdminRole } from '../../utils/index';

import './style.scss';

const { Sider, Content, Header, Footer } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class Home extends Component {
  state = {
    currentUser: getUserInfo().username,
    collapsed: false,
    visible: false,
    logoutVisible: false,
    width: 0,
  };

  // 左侧菜单栏整体收缩、展开
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // 导航栏消息列表事件
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  // Logout
  handleLogoutOk = () => {
    this.setState({
      logoutVisible: false,
    });
  };

  handleLogoutCancel = () => {
    this.setState({
      logoutVisible: false,
    });
  };

  showLogoutModal = () => {
    Modal.confirm({
      title: 'Are you sure to logout?',
      content: 'When clicked the Confirm button, you will logout this system.',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        userLogout();
        this.props.history.push('/login');
      },
    });
  };

  getNoticeContent = () => {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="notification" />
              通知
            </span>
          }
          key="1"
        >
          <List
            size="large"
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="message" />
              消息
            </span>
          }
          key="2"
        >
          <List
            size="large"
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="info-circle" />
              待办
            </span>
          }
          key="3"
        >
          <List
            size="large"
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
      </Tabs>
    );
  };

  render() {
    const { match } = this.props;
    // 导航栏右侧用户下拉菜单
    const popMenu = (
      <Menu
        onClick={(p) => {
          if (p.key === 'logout') {
            this.showLogoutModal();
          } else {
            message.info(p.key);
          }
        }}
      >
        <Menu.Item key="notification">Notification</Menu.Item>
        <Menu.Item key="setting">Settings</Menu.Item>
        <Menu.Item key="logout">Logout</Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={256}
          className="sider-menu"
          theme="dark"
        >
          <div className="logo">
            <img src={Logo} alt="logo" />
            {/* <h1>Management Pro</h1> */}
          </div>
          <MenuBar />
        </Sider>
        <Layout>
          <Header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              background: '#fff',
              padding: 0,
              boxShadow: '0 1px 4px rgba(0,21,41,.08)',
            }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="right-side-all">
              <div className="search-bar">
                <Search
                  placeholder="Search..."
                  onSearch={(value) =>
                    message.info(`You wanna search ${value}`)
                  }
                  style={{ width: 210 }}
                />
              </div>
              <div className="right-side">
                <Tooltip title="Go the Project GitHub Page">
                  <span className="github">
                    <a
                      href="https://github.com/ChenxiiCheng/Management-Platform-Admin"
                      target="_blank"
                      style={{ color: '#555' }}
                    >
                      <Icon type="github" />
                    </a>
                  </span>
                </Tooltip>

                <Popover
                  content={this.getNoticeContent()}
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  <span className="message">
                    <Badge count={10} offset={[6, -5]}>
                      <Icon type="bell" />
                    </Badge>
                  </span>
                </Popover>

                <Dropdown overlay={popMenu}>
                  <div className="avatar-user">
                    <Avatar
                      className="avatar"
                      shape="square"
                      src={myAvatar}
                      size={28}
                    />
                    <span className="admin">
                      Hello, {this.state.currentUser} <Icon type="user" />
                    </span>
                  </div>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: '10px',
              padding: '10px',
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path={`${match.path}/user`} component={UserInfo} />
              <Route path={`${match.path}/house`} component={HouseInsu} />
              <Route path={`${match.path}/auto`} component={AutoInsu} />
              <Route
                path={`${match.path}/control`}
                render={(props) => {
                  if (!isAdminRole()) {
                    message.error(
                      'You do not have this route permissions! Redirect to user page',
                      3
                    );
                    return <UserInfo {...props} />;
                  }
                  return <ControlPanel {...props} />;
                }}
              />
              <Redirect to="/home/user" from="/home" />
              <Route
                render={() => (
                  <h3>Welcome to role permission management system</h3>
                )}
              />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '16px 50px' }}>
            Chenxi Cheng, Ruiqi Cao ©2020 Created by Team
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Home);
