import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';

class addTaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      description: '',
      effort: '',
      priority: '',
      userstory: ['nc']
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUSChange = this.handleUSChange.bind(this),
    this.handleIdChange = this.handleIdChange.bind(this);
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
        description: '',
        effort: '',
        priority: '',
        userstory: ['nc']
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

  handleIdChange(event){

    for (let task of this.props.tasks) {
      if (parseInt(task.id) === parseInt(event.target.value)){
        Session.set('taskToEdit', task._id);
        return;
      }
    }

    this.setState({id: parseInt(event.target.value)});
    Session.set('taskToEdit', null);
  }

  handleSubmit(){
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
  }

  renderSelectList(){
    return (
      <select value={this.state.userstory[0]} onChange={this.handleUSChange} className="form-control">
        <option value='nc'>Please select an US</option>
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
          <div className="input-group">
            {this.renderSelectList()}
            <input style={{width: '10%'}} placeholder="Identifiant" type="number" className="form-control" value={this.state.id} onChange={this.handleIdChange}/>
            <input style={{width: '40%'}} placeholder="Description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange('description', false)}/>
            <input style={{width: '20%'}} placeholder="Effort" type="number" className="form-control" value={this.state.effort} onChange={this.handleChange('effort', true)}/>
            <input style={{width: '20%'}} placeholder="Priority" type="number" className="form-control" value={this.state.priority} onChange={this.handleChange('priority', true)}/>
            <div className="input-group-btn">
              <button onClick={this.handleSubmit} className="btn btn-primary btn-block btn-flat">Add</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default addTaskForm;
