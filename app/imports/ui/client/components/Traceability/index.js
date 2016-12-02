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
  const subscribeCommits = Meteor.subscribe('commits', props.currentProject.name, 0);

  //TMP : ajout d'un commit juste pour présenter l'affichage
  let tmp = {
    value: 'nbvbvbt2tb2v',
    date: '23/10/2016'
  };

  Meteor.call('commit.add', tmp, props.currentProject.name,0,
  function(err, res) {
    if (err) {
      Session.set('error', err.message);
      Session.set('success', null);
    } else {
      Session.set('success', 'Done !');
      Session.set('error', null);
    }
  });

  //Fin TMP

  const commits = Collections.Commits.find({}).fetch();
  const loaded = !!subscribeCommits && !!commits;
  return {
    loaded,
    commits: loaded ? commits : []
  };
}, TraceabilityBox);
