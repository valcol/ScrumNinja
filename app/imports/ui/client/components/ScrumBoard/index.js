import React, { Component } from 'react';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import { Meteor } from 'meteor/meteor';
import DragDrop from './DragAndDrop';

class ScrumBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSprint:''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({currentSprint: event.target.value});
  }
  renderSelectList(){

    return (
      <select value={this.state.currentSprint} onChange={this.handleChange} className="form-control">
        <option value ='0'>Choose one sprint</option>
        {this.props.sprints.map((sprint) => (
            <option value={sprint._id}>Sprint#{sprint.start} : {sprint.description}</option>
        ))}
      </select>

    );
  }

  render() {
    const {currentSprint} = this.state;
    return (
      <Box>
        <div className='table-sort'>
          <label>Choose a sprint:</label>
          {this.renderSelectList()}
        </div>
        <DragDrop currentProject={this.props.currentProject}
          tasks={this.props.tasks}
          userstories={this.props.userstories}
          currentSprint={this.state.currentSprint}/>
      </Box>
    );
  }
}
export default createContainer((props) => {
  const us = Meteor.subscribe('userstories', props.currentProject.name);
  const task = Meteor.subscribe('tasks', props.currentProject.name);
  const sprint = Meteor.subscribe('sprints', props.currentProject.name);
  const userstories = Collections.UserStories.find({}, {sort: {id: 1}}).fetch();
  const tasks = Collections.Tasks.find({}, {sort: {id: 1}}).fetch();
  const sprints = Collections.Sprints.find({}, {sort: {id: 1}}).fetch();

  const loaded = !!us && !!task && !!sprint && !!userstories && !!tasks && !!sprints;
  return {
    error: Session.get('error'),
    success: Session.get('success'),
    loaded,
    tasks: loaded ? tasks : [],
    userstories: loaded ? userstories : [],
    sprints : loaded ? sprints : []
  };
}, ScrumBoard);
