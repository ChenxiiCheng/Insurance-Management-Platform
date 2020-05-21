import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Form, message, Icon } from 'antd';

import { userRegister } from '../../services/auth';
import { setUserToken, setUserInfo } from '../../utils/index';

import './style.scss';

const Register = (props) => {
  const { getFieldDecorator } = props.form;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { form, history } = props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        const registerConfig = { username, password };
        userRegister(registerConfig)
          .then((res) => {
            if (res.success === true) {
              // 设置token值
              setUserToken(res.token);

              // 设置用户信息
              setUserInfo(res.data);

              message.success('Register success!');
              history.push('/home');
            } else {
              message.error('Register failed, please try again...');
            }
          })
          .catch((err) => {
            console.log(err);
            message.error('Register failed, please try again...');
          });

        // const loginConfig = {
        //   url: '/login',
        //   method: 'POST',
        //   params: { username, password },
        //   config: {}
        // }
        // setFetchConfig(Object.assign({}, loginConfig))
        // register(username);
        // message.success('Register success!');
        // console.log(history);
        // history.push('/home/control');
      }
    });
  };

  const handleEnterPress = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      handleFormSubmit(e);
    }
  };

  return (
    <div className="register__container">
      <div className="register__wrap">
        <div className="register__wrap--left">
          <img
            className="img1"
            src={require('../../utils/imgs/register_bg1.png')}
            alt="bg-1"
          />
          <img
            className="img2"
            src={require('../../utils/imgs/register_bg2.png')}
            alt="bg-2"
          />
        </div>
        <div className="register__wrap--right">
          <div className="form__decoration">
            <div className="logo2">B</div>
          </div>
          <div className="form__container">
            <div className="form__title">
              Register
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
                    <input className="form__input" placeholder="Username" />
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
                      placeholder="Password"
                      onKeyUp={handleEnterPress}
                    />
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('isRemember', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(<Checkbox className="form__remember">Remember me</Checkbox>)}
              </Form.Item>
              <button className="form__button" type="submit">
                Register
              </button>
            </Form>
            <div className="form__footer">
              <Link to="/login">Already has account? Click here to login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form.create({ name: 'registerForm' })(Register);
