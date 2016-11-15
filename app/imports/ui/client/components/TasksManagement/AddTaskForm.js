import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';

class addTaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      description: '',
      effort: '',
      priority: '',
      userstory: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUSChange = this.handleUSChange.bind(this),
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.taskToEdit) {
      if (nextProps.taskToEdit !== this.props.taskToEdit) {
        this.setState({
          id: nextProps.taskToEdit.id,
          description: nextProps.taskToEdit.description,
          effort: nextProps.taskToEdit.effort,
          priority: nextProps.taskToEdit.priority,
          userstory: nextProps.taskToEdit.userstory
        });
        Session.set('warning', 'Caution: you are editing an existing US : US#'+nextProps.taskToEdit.id);
      }
    }
    else {
      this.setState({
        id: 0,
        description: '',
        effort: '',
        priority: '',
        userstory: null
      });
      Session.set('warning', null);
    }
  }

  handleChange(key, isInt) {
    return function (e) {
      let state = {};
      if (isInt)
      state[key] = parseInt(e.target.value);
      else
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleUSChange(e) {
      this.setState({userstory:[e.target.value]});
  }

  handleCancelEdit(event){
    Session.set('taskToEdit', null);
  }

  handleSubmit(e){
    e.preventDefault();
    Meteor.call('tasks.update', this.state, this.props.currentProject.name,
    function(err, res) {
      if (err) {
        Session.set('error', err.message);
        Session.set('success', null);
      } else {
        Session.set('success', 'Done !');
        Session.set('error', null);
      }
    });

    if (this.props.taskToEdit)
      Session.set('taskToEdit', null);
  }

  renderSelectList(){
    return (
      <select value={this.state.userstory ? this.state.userstory[0] : ''} onChange={this.handleUSChange} className="form-control" required>
        <option value=''>Please select an US</option>
        {this.props.userstories.map((userstory) => (
            <option value={userstory._id}>US#{userstory.id} : {userstory.description}</option>
        ))}
      </select>
    );
  }

  render(){
    return (
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            {this.renderSelectList()}
            <input style={{width: '40%'}} placeholder="Description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange('description', false)} required/>
            <input style={{width: '20%'}} placeholder="Effort" type="number" className="form-control" value={this.state.effort} onChange={this.handleChange('effort', true)} required/>
            <input style={{width: '20%'}} placeholder="Priority" type="number" className="form-control" value={this.state.priority} onChange={this.handleChange('priority', true)} required/>
            {this.props.taskToEdit ?
              <div className="input-group-btn">
              <button onClick={this.handleCancelEdit} className="btn btn-primary btn-block btn-flat">Cancel edit</button>
              </div> : ''}
            <div className="input-group-btn">
              <button className="btn btn-primary btn-block btn-flat">{this.props.taskToEdit ? 'Confirm' : 'Add'}</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default addTaskForm;
