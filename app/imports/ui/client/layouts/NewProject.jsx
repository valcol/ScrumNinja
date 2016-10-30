import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

class NewProject extends Component {

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

  handleSubmit(){
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
<div className="row">
  {/* left column */}
  <div className="col-md-12">
    <div className="box">
      <div className="box-header">
        <h3 className="box-title">Project description</h3>
      </div>
      {/* /.box-header */}
      <div className="box-body pad">
        {/* Name */}
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
          <input type="date" onChange={this.handleChange('start')} value={this.state.start} className="form-control pull-right datepicker" required />
      </div>
        {/* /.input group */}
      </div>
      <div className="form-group">
        <label>End:</label>
        <div className="input-group date">
          <div className="input-group-addon">
            <i className="fa fa-calendar" />
          </div>
          <input type="date" onChange={this.handleChange('end')} value={this.state.end} className="form-control pull-right datepicker" required />
        </div>
        {/* /.input group */}
      </div>
        {/* Public Private */}
        <div className="form-group">
          <label>Visibility level:</label>
          <div className="radio">
            <label>
              <input type="radio" defaultChecked={true} onChange={this.handleChange('visibility')} value="public" defaultChecked/>
              Public
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" onChange={this.handleChange('visibility')} value="private" />
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
          <input type="text" className="form-control" value={/*Meteor.user().emails[0].address*/'Pseudo'} disabled/>
          <p className="help-block">This project will be created with you as the Administrator.
          Once the project exists, you may choose an Administrator from among the project members.</p>
        </div>
        { this.props.error ?
        <div className="callout callout-danger">
            {this.props.error}
        </div>
        : this.props.success ?
        <div className="callout callout-success">
            {this.props.success}
        </div>
        :
        <div></div>
        }
        <button className="btn btn-flat center-block" onClick={this.handleSubmit}>
          Submit
        </button>
          </div>
        </div>
        {/* /.box */}
      </div>
      {/* /.row */}
    </div>
  );
}
}

export default createContainer(() => {
  return {
    error: Session.get('error'),
    success: Session.get('success')
  };
}, NewProject);
