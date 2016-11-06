import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import MembersList  from './MembersList.js';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import AddMemberForm from './AddMemberForm.js';
import Loading from '../misc/Loading';

class ProjectMembers extends Component {

  constructor(props) {
    super(props);
  }

  isAdmin(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'pa');
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Project members
        </BoxHeader>
        {!this.props.loaded ? <Loading/> :
        <BoxBody>
          <MembersList currentProject={this.props.currentProject}
            isAdmin={(this.isAdmin())}/>
          <FeedbackMessage
            error={this.props.error}
            success={this.props.success}
            />
        </BoxBody>
        }
        {this.isAdmin() ?
          <BoxFooter>
            <AddMemberForm currentProject={this.props.currentProject}/>
          </BoxFooter>
          :<div></div>}
        </Box>
      );
    }
  }

  export default createContainer((props) => {
    const subscribe = Meteor.subscribe('users');
    const loaded = !!subscribe.ready();
    return {
      success: Session.get('success'),
      error: Session.get('error'),
      loaded
    };
  }, ProjectMembers);
