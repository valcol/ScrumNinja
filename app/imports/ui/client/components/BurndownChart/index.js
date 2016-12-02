import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import Recharts from 'recharts';

import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';

class Burndown extends Component {

  constructor(props) {
    super(props);

  }


  getData(){
    let data =[];
    for(stat of this.props.bc){
      for(i=0; i<=stat.nbSprint;++i){
          if(stat.actual[i] > 0){
            data.push({name : 'Sprint #'+i , planned : stat.planned[i] , actual :stat.actual[i]});
          }
          else {
            data.push({name : 'Sprint #'+i , planned : stat.planned[i]});
          }

      }
    }
    return data;
  }

  render() {
    const {LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
    const data = this.getData() ;

    return (
      <Box>
        <BoxHeader>
          Burndown Chart
        </BoxHeader>
        <BoxBody>
          <ResponsiveContainer width='100%' height={240}>
            <LineChart data= {data}
              margin={{top: 5, right: 20, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Line type="linear" dataKey="planned" stroke="#8884d8" activeDot={{r: 8}}/>
              <Line type="linear" dataKey="actual" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </BoxBody>
      </Box>
    );
  }
}

export default createContainer((props) => {
  const subscribeBC = Meteor.subscribe('burndownChart', props.currentProject.name);
  const subscribeSprints = Meteor.subscribe('sprints', props.currentProject.name);
  const subscribeUS = Meteor.subscribe('userstories', props.currentProject.name);
  const subscribeTasks = Meteor.subscribe('tasks', props.currentProject.name);
  const sprints = Collections.Sprints.find({}, {sort: {start: 1}}).fetch();
  const userstories = Collections.UserStories.find({}).fetch();
  const tasks = Collections.Tasks.find({}).fetch();
  const bc = Collections.BurndownChart.find({}).fetch();

  const loaded = !!subscribeUS && !!subscribeSprints && !!subscribeTasks && !!sprints && !!tasks && !!userstories && !!subscribeBC && !!bc;
  return {
    success: Session.get('success'),
    error: Session.get('error'),
    sprints: loaded ? sprints : [],
    userstories: loaded ? userstories : [],
    tasks: loaded ? tasks : [],
    bc : loaded ? bc :[],
    loaded
  };
}, Burndown);
