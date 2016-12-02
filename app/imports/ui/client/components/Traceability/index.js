import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import TraceabilityList  from './TraceabilityList.js';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';

class TraceabilityBox extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Box>
          <BoxHeader>
            Traceability
          </BoxHeader>
          <BoxBody>
            <TraceabilityList currentProject={this.props.currentProject}
              commits={this.props.commits} />
          </BoxBody>
        </Box>
        );
      }
}


export default createContainer((props) => {
  const subscribeCommits = Meteor.subscribe('commits', props.currentProject.name);
  const commits = Collections.Commits.find({}).fetch();
  const loaded = !!subscribeCommits && !!commits;
  return {
    loaded,
    commits: loaded ? commits : []
  };
}, TraceabilityBox);
