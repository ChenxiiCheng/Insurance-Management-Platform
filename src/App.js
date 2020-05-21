import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { authLogin } from './utils/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return <Redirect to="/home/control" {...props} />;
          }}
        />
        <Route
          path="/home"
          render={(props) => {
            // 校验用户是否登陆，如果没有登录跳转到登录界面
            if (!authLogin()) {
              return <Redirect to="/login" />;
            }
            return <Home {...props} />;
          }}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
