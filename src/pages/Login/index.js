import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Form, message, Icon, Spin } from 'antd';
import LinkIcon from '../LinkIcon';
import { userLogin } from '../../services/auth';
import { setUserToken, setUserInfo } from '../../utils/index';

import './style.scss';

const Login = (props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getFieldDecorator } = props.form;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { form, history } = props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        const loginConfig = { username, password };
        userLogin(loginConfig)
          .then((res) => {
            if (res.success === true) {
              // 保存token值到localStorage
              setUserToken(res.token);

              // 保存用户信息到localStorage
              setUserInfo(res.data);
              setLoading(false);
              history.push('/home');
            } else {
              message.error(
                'Login failed, please provide correct username and password.'
              );
            }
          })
          .catch((err) => {
            message.error(
              'Login failed, please provide correct username and password.'
            );
          });
        // const loginConfig = {
        //   url: '/login',
        //   method: 'POST',
        //   params: { username, password },
        //   config: {}
        // }
        // setFetchConfig(Object.assign({}, loginConfig))
      }
    });
  };

  const handleEnterPress = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      handleFormSubmit(e);
    }
  };

  const handleMaskClick = () => {
    setIsModalOpened(false);
  };

  return loading === true ? (
    <Spin
      tip="Loading..."
      style={{ position: 'absolute', top: '30%', left: '48%' }}
    />
  ) : (
    <Fragment>
      <div className="login__container">
        <div
          className="login__mask"
          hidden={!isModalOpened}
          onClick={handleMaskClick}
        >
          <div className="login__mask__container">
            <div className="tips">Not yet supported</div>
            <img src={require('../../utils/imgs/wechat.jpeg')} alt="wechat" />
          </div>
        </div>
        <div className="login__wrap">
          <div className="login__wrap--left">
            <img
              className="img1"
              src={require('../../utils/imgs/login_bg.png')}
              alt="bg-1"
            />
            <img
              className="img2"
              src={require('../../utils/imgs/login_bg2.png')}
              alt="bg-2"
            />
          </div>
          <div className="login__wrap--right">
            <div className="form__decoration">
              <div className="logo1">D</div>
            </div>
            <div className="form__container">
              <div className="form__title">
                Login
                <br />
                Mangemant System
              </div>
              <Form onSubmit={handleFormSubmit}>
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        min: 2,
                        message: 'Please enter at least 2 characters!',
                      },
                      { required: true, message: 'Please enter username!' },
                    ],
                  })(
                    <div className="form__wrap">
                      {/* <i className="form__icon iconfont icon-yonghu" /> */}
                      <Icon type="user" />
                      <input
                        className="form__input"
                        placeholder="Username: admin1 (only for test)"
                      />
                    </div>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        min: 6,
                        message: 'Please enter at least 6 characters!',
                      },
                      {
                        max: 15,
                        message: 'Please enter at most 15 characters!',
                      },
                      { required: true, message: 'Please enter password!' },
                    ],
                  })(
                    <div className="form__wrap">
                      {/* <i className="form__icon iconfont icon-mima" /> */}
                      <Icon type="eye" />
                      <input
                        className="form__input"
                        type="password"
                        placeholder="Password: 123456 (only for test)"
                        onKeyUp={handleEnterPress}
                      />
                    </div>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('isRemember', {
                    valuePropName: 'checked',
                    initialValue: false,
                  })(
                    <Checkbox className="form__remember">Remember me</Checkbox>
                  )}
                </Form.Item>
                <button className="form__button" type="submit">
                  Login
                </button>
              </Form>
              <div className="form__footer">
                <Link to="/register">Haven't registered yet?</Link>
                <div className="form__link">
                  Other ways
                  <LinkIcon
                    icon="wechat.png"
                    onClick={() => setIsModalOpened(true)}
                  />
                  <LinkIcon
                    icon="qq.png"
                    onClick={() => setIsModalOpened(true)}
                  />
                  <LinkIcon
                    icon="weibo.png"
                    onClick={() => setIsModalOpened(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Form.create({ name: 'loginForm' })(Login);
