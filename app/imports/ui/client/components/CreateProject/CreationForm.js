import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import FeedbackMessage  from '../misc/FeedbackMessage';

class CreationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      start: '',
      end: '',
      visibility: 'public',
      description: ''
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
    Meteor.call('project.create', this.state, function(err, res) {
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
          <label>Name:</label>
          <input type="text" onChange={this.handleChange('name')} value={this.state.name} className="form-control" pattern="^[a-zA-Z ]{2,30}$" required />
          <p className="help-block">The project name must contains between 2 and 30 letters, lowercase or uppercase.</p>
        </div>
        {/* Date range */}
        <div className="form-group">
          <label>Start:</label>
          <div className="input-group date">
            <div className="input-group-addon">
              <i className="fa fa-calendar" />
            </div>
            <input type="date" onChange={this.handleChange('start')} value={this.state.start} id="start" className="form-control pull-right datepicker" required />
          </div>
          {/* /.input group */}
        </div>
        <div className="form-group">
          <label>End:</label>
          <div className="input-group date">
            <div className="input-group-addon">
              <i className="fa fa-calendar" />
            </div>
            <input type="date" onChange={this.handleChange('end')} value={this.state.end} id="end" className="form-control pull-right datepicker" required />
          </div>
          {/* /.input group */}
        </div>
        {/* Public Private */}
        <div className="form-group">
          <label>Visibility level:</label>
          <div className="radio">
            <label>
              <input type="radio" checked={this.state.visibility === 'public'} onChange={this.handleChange('visibility')} value="public"/>
              Public
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" checked={this.state.visibility === 'private'} onChange={this.handleChange('visibility')} value="private" />
              Private
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea className="form-control" rows="5" onChange={this.handleChange('description')} value={this.state.description} required />
        </div>
        <div className="form-group">
          <label>Administrator:</label>
          <input type="text" className="form-control" value={this.props.user.username} disabled/>
          <p className="help-block">This project will be created with you as the Administrator.
            Once the project exists, you may choose an Administrator from among the project members.</p>
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
}, CreationForm);
