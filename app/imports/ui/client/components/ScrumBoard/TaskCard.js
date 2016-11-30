import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './ItemTypes';
import { DragSource } from 'react-dnd';

const taskSource = {
  beginDrag() {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Task extends Component {

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 40,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
      ♘
      </div>
    );
  }
}

Task.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.TASK, taskSource, collect)(Task);
