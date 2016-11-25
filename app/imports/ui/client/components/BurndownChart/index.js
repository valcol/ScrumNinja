import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import Recharts from 'recharts';

import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';

class Burndown extends Component {

  constructor(props) {
    super(props);
  }
  render() {

    const {LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
    const data = [
      {name: 'Sprint #1', planned: 220, actual: 220},
      {name: 'Sprint #2', planned: 185, actual: 180},
      {name: 'Sprint #3', planned: 130, actual: 160},
      {name: 'Sprint #4', planned: 100, actual: 100},
      {name: 'Sprint #5', planned: 60, actual: 70}
    ];

    return (
      <Box>
        <BoxHeader>
          Burndown Chart
        </BoxHeader>
        <BoxBody>
          <ResponsiveContainer width='100%' height={240}>
          <LineChart data={data}
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
  const subscribe = Meteor.subscribe('users', props.currentProject.name);
  const loaded = !!subscribe.ready();
  return {
    success: Session.get('success'),
    error: Session.get('error'),
    loaded
  };
}, Burndown);
