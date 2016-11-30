import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './ItemTypes.js';
import { DropTarget } from 'react-dnd';

const target = {
  drop(props) {

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left'
};

class None extends Component {
  render() {
    const {connectDropTarget, isOver } = this.props;
    const isActive = isOver;

    let backgroundColor = '#222';
       if (isActive) {
         backgroundColor = 'darkgreen';
       }

       return connectDropTarget(
         <div style={{ ...style, backgroundColor }}>
           'None'
         </div>
       );
  }
}

None.propTypes = {
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.TASK,target, collect)(None);
