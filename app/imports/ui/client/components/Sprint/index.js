import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import { Meteor } from 'meteor/meteor';
import SprintsList  from './SprintList.js';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import AddSprintForm from './AddSprintForm.js';
import Loading from '../misc/Loading';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './css/react-big-calendar.css';

class SprintsBox extends Component {

  constructor(props) {
    super(props);
    BigCalendar.momentLocalizer(moment);
  }

  isVisitorOrPo(){
    let role = this.props.currentProject.roles[Meteor.userId()];
    return (role === 'po' || !role);
  }

  getEvents(){
    this.props.sprints.map((sprint) => ({title: sprint.description, start:sprint.start, end:sprint.end}));
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Sprints
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
          <BoxBody>
            <h4>Calendar</h4>
            <div style={{height:'400px'}}>
                <BigCalendar
                  events={this.props.sprints}
                  titleAccessor='description'
                  defaultDate={new Date(2016, 3, 1)}
                  />
              </div>
              <h4>Sprints List</h4>
              <SprintsList currentProject={this.props.currentProject}
                sprints={this.props.sprints}
                isVisitorOrPo={(this.isVisitorOrPo())}
                userstories={this.props.userstories}/>
            </BoxBody>
          }
          {!this.isVisitorOrPo() ?
            <BoxFooter>
              <FeedbackMessage
                error={this.props.error}
                success={this.props.success}
                />
              <FeedbackMessage
                warning={this.props.warning}
                />
              <AddSprintForm currentProject={this.props.currentProject}
                sprints={this.props.sprints}
                sprintToEdit={this.props.sprintToEdit}
                userstories={this.props.userstories}
                />
            </BoxFooter>
            : <div></div>}
            {!this.props.loaded ? <Loading/> : ''}
          </Box>
        );
      }
    }

    export default createContainer((props) => {
      const subscribeUs = Meteor.subscribe('userstories', props.currentProject.name);
      const userstories = Collections.UserStories.find({}, {sort: {id: 1}}).fetch();
      const subscribeSprint = Meteor.subscribe('sprints', props.currentProject.name);
      const sprints = Collections.Sprints.find({}, {sort: {start: 1}}).fetch();
      const loaded = !!sprints && !!subscribeSprint && !!subscribeUs && !!userstories;
      const sprintToEdit = Session.get('sprintToEdit') ? Collections.Sprints.findOne({_id:Session.get('sprintToEdit')}) : null;

      return {
        error: Session.get('error'),
        success: Session.get('success'),
        warning: Session.get('warning'),
        loaded,
        sprints: loaded ? sprints : [],
        userstories: loaded ? userstories : [],
        sprintToEdit
      };
    }, SprintsBox);
