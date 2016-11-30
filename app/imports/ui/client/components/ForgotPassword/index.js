import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LinkItem from '../misc/LinkItem';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';
import { Accounts } from 'meteor/accounts-base';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    Accounts.forgotPassword(this.state, function(err, res) {
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
          <p className="login-box-msg">Reset your password :</p>
            <FeedbackMessage
              error={this.props.error}
              success={this.props.success}
              />
          <div className="form-group has-feedback">
            <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email}
              onChange={this.handleChangeEmail}/>
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="row">
            <div className="col-xs-4">
              <button onClick={this.handleSubmit} className="btn btn-primary btn-block btn-flat">Sign In</button>
            </div>
          </div>
          <LinkItem to={'/r/login'} className={'signup'}>Cancel</LinkItem>
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
