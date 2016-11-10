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

  render() {
    return (
      <Box>
        <BoxHeader>
          User Stories
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
        <BoxBody>
          <UserStoriesList currentProject={this.props.currentProject}
            userstories={this.props.userstories}/>
          <FeedbackMessage
            error={this.props.error}
            success={this.props.success}
            />
        </BoxBody>
        }
        {
          <BoxFooter>
            <AddUserStoryForm currentProject={this.props.currentProject}/>
          </BoxFooter>
          }
        {!this.props.loaded ? <Loading/> : ''}
      </Box>
      );
    }
}

export default createContainer((props) => {
  const subscribe = Meteor.subscribe('userstories', props.currentProject.name);
  const userstories = Collections.UserStories.find({}).fetch();
  const loaded = !!userstories && !!subscribe;
  return {
    error: Session.get('error'),
    success: Session.get('success'),
    loaded,
    userstories: loaded ? userstories : []
  };
}, UserStoriesBox);
