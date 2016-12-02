import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const columnTarget = {
  drop(props) {
    return {state : props.state};
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Column extends Component {

  constructor(props) {
    super(props);
  }



render() {

  const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
  return connectDropTarget(
      <td className='sbcol'>
        { this.props.children }
      </td>
  );
}
}

export default DropTarget('card', columnTarget, collect)(Column);
