import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Header from './../../components/Header/Header';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import Signup from '.././Login/Signup/Signup';
import './Login.css';
import signup from './Signup/Signup';
import { Redirect, Route } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
class login extends Component {
  state = {
    userName: '',
    password: '',
    checkBoxChecked: true,
    submitted: false,
    isSignup: false,
    auth: false
  };
  updateCheck = () => {
    this.setState(oldState => {
      return { checkBoxChecked: !oldState.checked };
    });
  };
  changeToSignup = () => {
    this.setState({
      isSignup: true
    });
  };

  inputValue = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    switch (inputName) {
      case 'userName':
        this.setState({
          userName: inputValue.trim()
        });
        break;
      case 'password':
        this.setState({
          password: inputValue.trim()
        });
        break;
      default:
        '';
        break;
    }
  };
  onFormSubmit = event => {
    event.preventDefault();
    this.setState({
      submitted: true
    });
    if (this.state.userName.length > 0 && this.state.password.length > 0) {
      axios
        .post('http://localhost:3001/login', {
          userName: `${this.state.userName}`,
          password: `${this.state.password}`
        })
        .then(response => {
          this.setState({
            auth: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  render() {
    let userErr;
    let passErr;
    let route;
    let routeToMain;
    if (this.state.submitted) {
      if (this.state.userName.length <= 0) {
        userErr = 'This field is required';
      }
      if (this.state.password.length <= 0) {
        passErr = 'This field is required';
      }
    }
    if (this.state.isSignup) {
      route = <Redirect to="/signup" />;
    }

    if (this.state.auth) {
      routeToMain = (
        <Redirect
          to={{
            pathname: '/main',
            state: { loggedIn: this.state.auth }
          }}
        />
      );
    }
    return (
      <div className="login-container">
        <Header showMenu={false} />
        <Paper className="form-container" zDepth={3}>
          <form onSubmit={this.onFormSubmit}>
            <h1 className="form-header"> Log in</h1>
            <TextField
              type="text"
              hintText="User Name"
              name="userName"
              floatingLabelText="User Name"
              onChange={this.inputValue.bind(this)}
              errorText={userErr}
            />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.inputValue.bind(this)}
              errorText={passErr}
            />
            <Checkbox
              className="checkbox"
              label="Remember Me"
              onCheck={this.updateCheck.bind(this)}
            />
            <RaisedButton
              className="loginBtn"
              label="LOG IN"
              primary={true}
              type="submit"
            />
            <RaisedButton
              className="toSignupBtn"
              label="SIGN UP"
              secondary={true}
              onClick={this.changeToSignup}
            />
          </form>
        </Paper>
        {route}
        {routeToMain}
      </div>
    );
  }
}

export default login;
