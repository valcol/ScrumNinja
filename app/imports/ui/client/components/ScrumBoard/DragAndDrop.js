import React, { Component, PropTypes } from 'react';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import { Meteor } from 'meteor/meteor';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TaskCard from './TaskCard.js';
import Board from './Board.js';
import ItemTypes from './ItemTypes.js';

class ScrumBoardBox extends Component {

  constructor(props) {
    super(props);
  }

  renderTask(){
      return <TaskCard/>;
  }
  render() {
    return (
      <div>
        <BoxHeader>
          ScrumBoard
        </BoxHeader>
        <BoxBody>
          {this.renderTask()}
          <div>
            <Board/>
          </div>
        </BoxBody>
      </div>
    );
  }
}
ScrumBoardBox.propTypes = {
};

export default DragDropContext(HTML5Backend)(ScrumBoardBox);
