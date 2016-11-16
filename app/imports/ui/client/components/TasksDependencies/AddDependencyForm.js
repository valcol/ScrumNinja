import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';

class addDependencyForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      edge: ['', '']
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  handleChange(key, e) {
    let edge = this.state.edge;
    if (key === 0)
      this.setState({edge: [parseInt(e.target.value),this.state.edge[1]]});
    else
      this.setState({edge: [this.state.edge[0], parseInt(e.target.value)]});
  }


  handleCancelEdit(event){
    Session.set('dependencyToEdit', null);
    Session.set('success', null);
    Session.set('error', null);
  }

  handleSubmit(e){
    e.preventDefault();
    Meteor.call('dependencies.update', this.state, this.props.currentProject.name,
    function(err, res) {
      if (err) {
        Session.set('error', err.message);
        Session.set('success', null);
      } else {
        Session.set('success', 'Done !');
        Session.set('error', null);
      }
    });

    if (this.props.dependencyToEdit)
      Session.set('dependencyToEdit', null);
  }


  renderSelectListFirstEdge(){
    return (
      <select value={this.state.edge[0]} onChange={ (e) => { this.handleChange(0,e);}} className="form-control" required>
        <option value=''>Choose a Task</option>
        {this.props.tasks.map((task) => (
            <option value={task.id} disabled={(this.state.edge[1]===task.id)}>Task#{task.id} : {task.description}</option>
        ))}
      </select>
    );
  }

  renderSelectListSecondEdge(){
    return (
      <select value={this.state.edge[1]} onChange={ (e) => { this.handleChange(1,e);}} className="form-control" required>
        <option value=''>Choose a Task</option>
        {this.props.tasks.map((task) => (
            <option value={task.id} disabled={(this.state.edge[0]===task.id)}>Task#{task.id} : {task.description}</option>
        ))}
      </select>
    );
  }

  render(){
    return (
      <div className="row">
        <div className="col-lg-12">
          <h4>Add/Edit a dependency</h4>
          <form onSubmit={this.handleSubmit} >
            <div className="col-md-4">
            {this.renderSelectListFirstEdge()}
            </div>
            <div className="col-md-2">
            need to be completed before
            </div>
            <div className="col-md-4">
            {this.renderSelectListSecondEdge()}
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary btn-block btn-flat">Add</button>
            </div>
        </form>
        </div>
      </div>
    );
  }
}

export default addDependencyForm;
