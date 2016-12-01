import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import FeedbackMessage  from '../misc/FeedbackMessage';

class EditForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.emails[0].address,
      emailVerif: this.props.user.emails[0].address
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    if (this.state.email !== this.props.user.emails[0].address)
      if (this.state.email !== this.state.emailVerif)
        Session.set('error', 'Please verify your email');
      else
        Meteor.call('users.updateEmail', this.state.email, function(err, res) {
          if (err) {
            Session.set('error', err.message);
            Session.set('success', null);
          } else {
            Session.set('success', res);
            Session.set('error', null);
          }
        });

    if (this.state.username !== this.props.user.username)
      Meteor.call('users.updateUsername', this.state.username, function(err, res) {
        if (err) {
          Session.set('error', err.message);
          Session.set('success', null);
        } else {
          Session.set('success', res);
          Session.set('error', null);
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <div className="projectCreationForm">
        <div className="form-group">
          <label>Username :</label>
          <input type="text" onChange={this.handleChange('username')} value={this.state.username} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" onChange={this.handleChange('email')} value={this.state.email} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Confirm Email:</label>
          <input type="email" onChange={this.handleChange('emailVerif')} value={this.state.emailVerif} className="form-control" required />
        </div>
        <FeedbackMessage
          error={this.props.error}
          success={this.props.success}
          />
        <button type="submit" className="btn btn-primary btn-flat center-block">
          Submit
        </button>
      </div>
      </form>
    );
  }
}

export default createContainer(() => {
  return {
    error: Session.get('error'),
    success: Session.get('success'),
    user: Meteor.user() || {}
  };
}, EditForm);
