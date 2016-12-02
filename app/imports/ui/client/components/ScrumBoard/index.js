import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

import Board  from './Board.js';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import Loading from '../misc/Loading';

class ScrumBoard extends Component {

  constructor(props) {
    super(props);
  }

  isPaOrPm(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'pa' || this.props.currentProject.roles[Meteor.userId()] === 'pm');
  }

  currentSprintTasks(){
    let currentSprint = null;
    let currentSprintTasks = [];
    for (sprint of this.props.sprints){
      if (moment(sprint.start).isBefore(moment())){
        if (currentSprint)
        for (usId of currentSprint.userstory){
          for (task of this.props.tasks){
            if ((task.state < 4) && (task.userstory.indexOf(usId) > -1) &&
          (currentSprintTasks.indexOf(task) === -1)){
              task.isLate = true;
              currentSprintTasks.push(task);
            }
          }
        }
        currentSprint = sprint;
      }
    }
    if (currentSprint)
    for (usId of currentSprint.userstory){
      for (task of this.props.tasks){
        if ((task.userstory.indexOf(usId) > -1) &&
      (currentSprintTasks.indexOf(task) === -1)){
          task.isLate = false;
          currentSprintTasks.push(task);
        }
      }
    }

    return currentSprintTasks;
  }

  render() {
    return (
      <div>
      {!this.props.loaded ? <div></div> :
          <Board currentProject={this.props.currentProject}
            currentSprintTasks = {this.currentSprintTasks()}
            userstories = {this.props.userstories}
            isPaOrPm={this.isPaOrPm}/>
      }
      </div>
    );
  }
}

export default createContainer((props) => {
  const subscribeSprints = Meteor.subscribe('sprints', props.currentProject.name);
  const subscribeUS = Meteor.subscribe('userstories', props.currentProject.name);
  const subscribeTasks = Meteor.subscribe('tasks', props.currentProject.name);
  const subscribeUsers = Meteor.subscribe('users', props.currentProject.name);
  const sprints = Collections.Sprints.find({}).fetch();
  const userstories = Collections.UserStories.find({}).fetch();
  const tasks = Collections.Tasks.find({}).fetch();
  const loaded = !!subscribeUS && !!subscribeUsers && !!subscribeSprints && !!subscribeTasks && !!sprints && !!tasks && !!userstories;
  return {
    error: Session.get('error'),
    success: Session.get('success'),
    warning: Session.get('warning'),
    loaded,
    userstories: loaded ? userstories : [],
    sprints: loaded ? sprints : [],
    tasks: loaded ? tasks : []
  };
}, ScrumBoard);
