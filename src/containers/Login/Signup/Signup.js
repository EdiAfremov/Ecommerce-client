import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Header from '../../../components/Header/Header';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import './Signup.css';
class signup extends Component {
  state = {
    firstStep: true,
    formData: {
      email: {
        value: '',
        requierd: true,
        valid: false
      },
      password: {
        value: '',
        requierd: true,
        minLength: 4
      },
      confirmPass: {
        value: '',
        requierd: true,
        minLength: 4
      },
      firstName: {
        value: '',
        requierd: true
      },
      lastName: {
        value: '',
        requierd: true
      },
      address: {
        value: '',
        requierd: true
      },
      city: {
        value: '',
        requierd: true
      }
    },
    passwordsMatch: false,
    firstFormSubmitted: false,
    firstFormValid: false,
    secondFormSubmitted: false,
    firstStepValid: true
  };

  inputValue = event => {
    const name = event.target.name;
    const value = event.target.value.trim();

    switch (name) {
      case 'email':
        this.setState(prevState => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              email: {
                ...prevState.formData.email,
                value: value
              }
            }
          };
        }, this.validateEmail(value));
        break;
      case 'password':
        this.setState(prevState => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              password: {
                value: value,
                requierd: false,
                minLength: 4
              }
            }
          };
        });
        break;
      case 'confirmPassword':
        this.setState(prevState => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              confirmPass: {
                value: value,
                requierd: false
              }
            }
          };
        });
        break;
      case 'address':
        this.setState(prevState => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              address: {
                value: value,
                requierd: false
              }
            }
          };
        });
        break;
      case 'firstName':
        this.setState(prevState => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              firstName: {
                value: value,
                requierd: false
              }
            }
          };
        });
        break;
      case 'lastName':
        this.setState(prevState => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              lastName: {
                value: value,
                requierd: false
              }
            }
          };
        });
        break;
      default:
        '';
        break;
    }
  };
  selectHandleChange = (event, index, value) => {
    this.setState(prevState => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          city: {
            value: value,
            requierd: false
          }
        }
      };
    });
  };
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = re.test(String(email).toLowerCase());
    if (check) {
      return this.setState(prevState => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            email: {
              ...prevState.formData.email,
              valid: true
            }
          }
        };
      });
    }
  };

  pasaswordHandler = () => {
    const confirm = this.state.formData.confirmPass.value.trim();
    const password = this.state.formData.password.value.trim();
    if (confirm.length > 0 && password.length > 0) {
      if (password != confirm) {
        return this.setState({
          passwordsMatch: false
        });
      } else {
        return this.setState({
          passwordsMatch: true
        });
      }
    }
  };

  nextStepHandler = () => {
    this.pasaswordHandler();
    this.setState({
      firstFormSubmitted: true
    });

    if (
      this.state.formData.email.valid &&
      this.state.formData.confirmPass.value ==
        this.state.formData.password.value &&
      this.state.formData.email.value.length > 0 &&
      this.state.formData.password.value.length > 0 &&
      this.state.formData.confirmPass.value.length > 0 &&
      this.state.formData.password.value.length >=
        this.state.formData.password.minLength
    ) {
      this.setState({
        firstStep: false
      });
    }
  };

  backHandler = () => {
    this.setState({
      firstStep: true
    });
  };
  onFormSubmit = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        ...prevState,
        secondFormSubmitted: true
      };
    });
    if (
      this.state.formData.lastName.value.length > 0 &&
      this.state.formData.firstName.value.length > 0 &&
      this.state.formData.city.value.length > 0 &&
      this.state.formData.address.value.length > 0
    ) {
      axios
        .post('http://localhost:3001/signup', {
          data: `${this.state.formData}`
        })
        .then(response => {
          window.alert(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const cities = ['Tel-Aviv', 'Netanya', 'Haifa', 'Jerusalem'];

    const items = cities.map((item, i) => (
      <MenuItem key={i} value={item} primaryText={item} />
    ));
    let emailErr;
    let passwordErr;
    let confirmPassErr;
    let firstNameErr;
    let lastNameErr;
    let cityErr;
    let addressErr;

    if (this.state.firstFormSubmitted) {
      if (this.state.formData.email.value.length <= 0) {
        emailErr = 'This field is requierd';
      }
      if (
        this.state.formData.email.value.length > 0 &&
        !this.state.formData.email.valid
      ) {
        emailErr = 'Please insert valid mail';
      }
      if (this.state.formData.password.value.length <= 0) {
        passwordErr = 'This field is requierd';
      }
      if (
        this.state.formData.password.value.length > 0 &&
        this.state.formData.password.value.length <
          this.state.formData.password.minLength
      ) {
        passwordErr = 'Minimum 4 letters ';
      }
      if (this.state.formData.confirmPass.value.length <= 0) {
        confirmPassErr = 'This field is requierd';
      }
      if (
        this.state.formData.confirmPass.value.length > 0 &&
        !this.state.passwordsMatch
      ) {
        confirmPassErr = "Passwords don't match";
      }
    }

    if (this.state.secondFormSubmitted) {
      if (this.state.formData.firstName.value.length <= 0) {
        firstNameErr = 'This field is requierd';
      }
      if (this.state.formData.lastName.value.length <= 0) {
        lastNameErr = 'This field is requierd';
      }
      if (this.state.formData.address.value.length <= 0) {
        addressErr = 'This field is requierd';
      }
      if (this.state.formData.city.value.length <= 0) {
        cityErr = 'This field is requierd';
      }
    }
    const stepTwo = (
      <form onSubmit={this.onFormSubmit}>
        <h1 className="signup-form-header"> Sign Up</h1>
        <TextField
          value={this.state.formData.firstName.value}
          hintText="First Name"
          floatingLabelText="First Name"
          type="text"
          name="firstName"
          onChange={this.inputValue.bind(this)}
          errorText={firstNameErr}
        />
        <TextField
          value={this.state.formData.lastName.value}
          hintText="Last Name"
          floatingLabelText="Last Name"
          type="text"
          name="lastName"
          onChange={this.inputValue.bind(this)}
          errorText={lastNameErr}
        />
        <SelectField
          floatingLabelText="City"
          hintText="City"
          value={this.state.formData.city.value}
          name="city"
          onChange={this.selectHandleChange}
          errorText={cityErr}
        >
          {items}
        </SelectField>
        <TextField
          value={this.state.formData.address.value}
          hintText="Address"
          floatingLabelText="Address"
          type="text"
          name="address"
          onChange={this.inputValue.bind(this)}
          errorText={addressErr}
        />

        <RaisedButton
          className="signupBtnFinal"
          label="SIGNUP"
          primary={true}
          onClick={this.nextStepHandler}
          type="submit"
        />
        <RaisedButton
          className="signupBackBtn"
          label="BACK"
          secondary={true}
          onClick={this.backHandler}
        />
      </form>
    );

    return (
      <div className="signup-container">
        <Header showMenu={false} />
        <Paper className="signup-form-container" zDepth={3}>
          {this.state.firstStep ? (
            <form onSubmit={this.onFormSubmit}>
              <h1 className="signup-form-header"> Sign Up</h1>
              <TextField
                type="email"
                hintText="Email"
                name="email"
                floatingLabelText="Email"
                onChange={this.inputValue.bind(this)}
                errorText={emailErr}
                value={this.state.formData.email.value}
              />
              <TextField
                value={this.state.formData.password.value}
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                name="password"
                onChange={this.inputValue.bind(this)}
                errorText={passwordErr}
              />
              <TextField
                value={this.state.formData.confirmPass.value}
                hintText="Confirm Password"
                floatingLabelText="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={this.inputValue.bind(this)}
                errorText={confirmPassErr}
              />
              <RaisedButton
                className="signupNextBtn"
                label="NEXT"
                primary={true}
                onClick={this.nextStepHandler}
              />
            </form>
          ) : (
            stepTwo
          )}
        </Paper>
      </div>
    );
  }
}

export default signup;
