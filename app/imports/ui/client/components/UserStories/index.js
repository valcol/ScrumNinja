import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import {Meteor} from 'meteor/meteor';

import UserStoriesList  from './UserStoriesList.js';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import AddUserStoryForm from './AddUserStoryForm.js';
import Loading from '../misc/Loading';

class UserStoriesBox extends Component {

  constructor(props) {
    super(props);
  }

  isPaOrPm(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'pa' || this.props.currentProject.roles[Meteor.userId()] === 'pm');
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          User Stories
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
          <BoxBody>
            <UserStoriesList currentProject={this.props.currentProject}
              userstories={this.props.userstories}
              isPaOrPm={this.isPaOrPm}/>
          </BoxBody>
        }
        {(!this.props.loaded&&this.isPaOrPm())  ? <BoxFooter></BoxFooter> :
          <BoxFooter>
            <FeedbackMessage
              error={this.props.error}
              success={this.props.success}
              />
            <FeedbackMessage
              warning={this.props.warning}
              />
            <AddUserStoryForm currentProject={this.props.currentProject}
              userstories={this.props.userstories}
              userstoryToEdit={this.props.userstoryToEdit}/>
          </BoxFooter>
        }
        {!this.props.loaded ? <Loading/> : ''}
      </Box>
    );
  }
}

export default createContainer((props) => {
  const subscribe = Meteor.subscribe('userstories', props.currentProject.name);
  const userstories = Collections.UserStories.find({}, {sort: {id: 1}}).fetch();
  const loaded = !!userstories && !!subscribe;
  const userstoryToEdit = Session.get('userstoryToEdit') ? Collections.UserStories.findOne({_id:Session.get('userstoryToEdit')}) : null;
  return {
    error: Session.get('error'),
    success: Session.get('success'),
    warning: Session.get('warning'),
    loaded,
    userstories: loaded ? userstories : [],
    userstoryToEdit
  };
}, UserStoriesBox);
