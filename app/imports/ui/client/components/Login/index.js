import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LinkItem from '../misc/LinkItem';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    Meteor.loginWithPassword(email, password, function(err, res) {
      if (err) {
        Session.set('error', err.message);
      } else {
        window.location.href = '/u/';
      }
    });
  }

  render() {
    return (

      <div className="login-box">
        <div className="login-logo">
          <img src="/img/logo-wide.png" width='75%' height='75%' alt="logo"></img>
        </div>
        {/* /.login-logo */}
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
            <FeedbackMessage
              error={this.props.error}
              success={this.props.success}
              />
          <div className="form-group has-feedback">
            <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email}
              onChange={this.handleChangeEmail}/>
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password}
              onChange={this.handleChangePassword}/>
            <span className="glyphicon glyphicon-lock form-control-feedback" />
          </div>
          <div className="row">
            <div className="col-xs-4">
              <button onClick={this.handleSubmit} className="btn btn-primary btn-block btn-flat">Sign In</button>
            </div>
          </div>
          <LinkItem to={'/r/register'} className={'signup'}>Register a new membership</LinkItem>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    error: Session.get('error')
  };
}, Login);
