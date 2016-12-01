import React, { Component } from 'react';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import Loading from '../misc/Loading';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {
      description: props.task.description
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      let task = {
        id : props.task.id,
        description : props.task.description,
        userstory : props.task.userstory,
        state : parseInt(dropResult.state)
      };
      Meteor.call('tasks.update', task, props.currentProject.name, function(err, res) {
        if (err) {
          Session.set('error', err.message);
          Session.set('success', null);
        } else {
          Session.set('success', 'Done !');
          Session.set('error', null);
        }
      });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends Component {

  constructor(props) {
    super(props);
  }


render() {

 const { connectDragSource, isDragging } = this.props;

  return connectDragSource(
    <div>
    <Box>
      <BoxHeader>
        {this.props.task.description}
      </BoxHeader>
      <BoxBody>

      </BoxBody>
    </Box>
    </div>
  );
}
}

export default DragSource('card', cardSource, collect)(Card);
