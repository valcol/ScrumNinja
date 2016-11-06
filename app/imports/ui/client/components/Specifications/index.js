import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import FeedbackMessage from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import AddForm from './AddForm';
import Loading from '../misc/Loading';

class Specifications extends Component {

  constructor(props) {
    super(props);
  }

  isAdmin(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'pa');
  }

  isPo(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'po');
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Specifications
        </BoxHeader>
        <BoxBody>
        </BoxBody>
          <BoxFooter>
            <FeedbackMessage
              error={this.props.error}
              success={this.props.success}
              />
            {(this.isAdmin() || this.isPo()) ?
              <AddForm currentProject={this.props.currentProject}/> : ''}
          </BoxFooter>
          {!this.props.loaded ? <Loading/> : ''}
        </Box>
    );
  }
}

export default createContainer((props) => {
  return {
    error: Session.get('error'),
    success: Session.get('success'),
    loaded: true
  };
}, Specifications);
