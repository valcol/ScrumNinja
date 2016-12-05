import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card  from './Card.js';
import Column  from './Column.js';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';

class Board extends Component {

  constructor(props) {
    super(props);
  }

getCards(state){
  return this.props.currentSprintTasks.filter((task) => (task.state === state)).map((task) => (
    <Card task={task} currentProject={this.props.currentProject}
      userstories = {this.props.userstories}
      users = {this.props.users}
      tasks = {this.props.tasks} />
  ));
}


render() {
  return (
    <div>
    <Box>
      <BoxBody>
    <table className="table">
    <thead>
      <tr>
        <th style={{width: '25%'}}>To Do</th>
        <th style={{width: '25%'}}>On Going</th>
        <th style={{width: '25%'}}>In Testing</th>
        <th style={{width: '25%'}}>Done</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
      </table>
    </BoxBody>
    </Box>
    <table className="table">
    <thead>
      <tr>
        <th style={{width: '25%'}}></th>
        <th style={{width: '25%'}}></th>
        <th style={{width: '25%'}}></th>
        <th style={{width: '25%'}}></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <Column name='todo' state='1'>
          {this.props.currentSprintTasks ? this.getCards(1) : ' no cards'}
        </Column>
        <Column name='todo' state='2'>
          {this.props.currentSprintTasks ? this.getCards(2) : ' no cards'}
        </Column>
        <Column name='todo' state='3'>
          {this.props.currentSprintTasks ? this.getCards(3) : ' no cards'}
        </Column>
        <Column name='todo' state='4'>
          {this.props.currentSprintTasks ? this.getCards(4) : ' no cards'}
        </Column>
      </tr>
    </tbody>
  </table>
  </div>
  );
}
}

export default DragDropContext(HTML5Backend)(Board);
