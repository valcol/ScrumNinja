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

class SprintsBox extends Component {

  constructor(props) {
    super(props);
  }

  isVisitorOrPo(){
    let role = this.props.currentProject.roles[Meteor.userId()];
    return (role === 'po' || !role);
  }


  render() {
    return (
      <Box>
        <BoxHeader>
          Sprints
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
        <BoxBody>
          <h3>Sprints</h3>
          <SprintsList currentProject={this.props.currentProject}
            sprints={this.props.sprints}
            isVisitorOrPo={(this.isVisitorOrPo())}/>
          <h3>Add form</h3>

        </BoxBody>
        }
        {!this.isVisitorOrPo() ?
          <BoxFooter>
            <FeedbackMessage
              error={this.props.error}
              success={this.props.success}
              />
            <AddSprintForm currentProject={this.props.currentProject}
              sprints={this.props.sprints}
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
    const sprints = Collections.Sprints.find({}, {sort: {id: 1}}).fetch();
    const loaded = !!sprints && !!subscribeSprint && !!subscribeUs && !!userstories;
    return {
      error: Session.get('error'),
      success: Session.get('success'),
      loaded,
      sprints: loaded ? sprints : [],
      userstories: loaded ? userstories : []
    };
  }, SprintsBox);
