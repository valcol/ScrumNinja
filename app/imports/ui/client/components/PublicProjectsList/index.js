import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import PublicProjectsList from './PublicProjectsList.js';
import Loading from '../misc/Loading';

class PublicProjectsListBox extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(projectName) {
    Meteor.call('project.delete', projectName);
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Public Projects
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
        <BoxBody>
          <PublicProjectsList projects={this.props.projects}/>
        </BoxBody>
        }
        {!this.props.loaded ? <Loading/> : ''}
      </Box>
  );
}
}

export default createContainer(() => {
  const projects = Collections.Projects.find({['roles.'+Meteor.userId()]:{$exists : false}}).fetch();
  const loaded = !!projects;
  return {
    loaded,
    projects: loaded ? projects : []
  };
}, PublicProjectsListBox);
