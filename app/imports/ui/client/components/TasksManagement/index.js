import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import {Meteor} from 'meteor/meteor';

import TasksList  from './TasksList.js';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import AddTaskForm from './AddTaskForm.js';
import Loading from '../misc/Loading';

class TasksManagementBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUS:0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  isPaOrPm(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'pa' || this.props.currentProject.roles[Meteor.userId()] === 'pm');
  }

  handleChange(event){
    this.setState({currentUS: parseInt(event.target.value)});
  }


  renderSelectList(){
    return (
      <select value={this.state.currentUs} onChange={this.handleChange} className="form-control">
        <option value='0'>All</option>
        {this.props.userstories.map((userstory) => (
            <option value={userstory.id}>US#{userstory.id} : {userstory.description}</option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Tasks
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
          <BoxBody>
            <div className='table-sort'>
            <label>Sort by US:</label>
            {this.renderSelectList()}
            </div>
            <TasksList currentProject={this.props.currentProject}
              tasks={this.props.tasks}
              userstories={this.props.userstories}
              currentUS={this.state.currentUS}
              isPaOrPm={this.isPaOrPm()}/>
          </BoxBody>
        }
        {(!this.props.loaded)  ? <BoxFooter></BoxFooter> :
          this.isPaOrPm() ?
          <BoxFooter>
            <FeedbackMessage
              error={this.props.error}
              success={this.props.success}
              />
            <FeedbackMessage
              warning={this.props.warning}
              />
            <AddTaskForm currentProject={this.props.currentProject}
              userstories={this.props.userstories}
              tasks={this.props.tasks}
              taskToEdit={this.props.taskToEdit}
              />
          </BoxFooter>
          : <div></div>
        }
        {!this.props.loaded ? <Loading/> : ''}
      </Box>
    );
  }
}

export default createContainer((props) => {
  const subscribeUs = Meteor.subscribe('userstories', props.currentProject.name);
  const userstories = Collections.UserStories.find({}, {sort: {id: 1}}).fetch();
  const subscribeT = Meteor.subscribe('tasks', props.currentProject.name);
  const tasks = Collections.Tasks.find({}, {sort: {id: 1}}).fetch();
  const subscribeBC = Meteor.subscribe('burndownChart', props.currentProject.name);
  const bc = Collections.BurndownChart.find().fetch();
  const loaded = !!tasks && !!subscribeUs && !!subscribeT && !!userstories && !! subscribeBC && !!bc;
  const taskToEdit = Session.get('taskToEdit') ? Collections.Tasks.findOne({_id:Session.get('taskToEdit')}) : null;
  return {
    error: Session.get('error'),
    success: Session.get('success'),
    warning: Session.get('warning'),
    loaded,
    bc : loaded ? bc : [],
    tasks: loaded ? tasks : [],
    userstories: loaded ? userstories : [],
    taskToEdit
  };
}, TasksManagementBox);
