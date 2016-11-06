import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/collections.js';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import ProjectsList from './ProjectsList.js';
import Loading from '../misc/Loading';

class ProjectsListBox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Projects I belong to
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
        <BoxBody>
          <ProjectsList projects={this.props.projects}/>
        </BoxBody>
        }
        {!this.props.loaded ? <Loading/> : ''}
      </Box>
    );
  }
}

export default createContainer(() => {
  const projects = Collections.Projects.find({['roles.'+Meteor.userId()]:{$exists : true}}).fetch();
  const loaded = !!projects;
  return {
    loaded,
    projects: loaded ? projects : []
  };
}, ProjectsListBox);
