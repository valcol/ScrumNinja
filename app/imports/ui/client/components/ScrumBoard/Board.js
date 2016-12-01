import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card  from './Card.js';
import Column  from './Column.js';

class Board extends Component {

  constructor(props) {
    super(props);
  }

getCards(state){
  return this.props.currentSprintTasks.filter((task) => (task.state === state)).map((task) => (
    <Card task={task} currentProject={this.props.currentProject}/>
  ));
}


render() {
  return (
<div className="container">
  <div className="row">
    <Column name='todo' state='1'>
      {this.props.currentSprintTasks ? this.getCards(1) : ' no cards'}
    </Column>
    <Column name='ongoing' state='2'>
      {this.props.currentSprintTasks ? this.getCards(2) : ' no cards'}
    </Column>
    <Column name='test' state='3'>
      {this.props.currentSprintTasks ? this.getCards(3) : ' no cards'}
    </Column>
    <Column name='done' state='4'>
      {this.props.currentSprintTasks ? this.getCards(4) : ' no cards'}
    </Column>
  </div>
</div>
  );
}
}

export default DragDropContext(HTML5Backend)(Board);
