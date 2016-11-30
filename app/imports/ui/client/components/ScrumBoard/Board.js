import React, { Component, PropTypes  } from 'react';
import None from './None.js';
import Todo from './Todo.js';
import Ongoing from './Ongoing.js';
import Done from './Done.js';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes.js';

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

class Board extends Component {

  render() {
    const {connectDropTarget, isOver } = this.props;
    const isActive = isOver;

    let backgroundColor = '#222';
       if (isActive) {
         backgroundColor = 'darkgreen';
       }

       return connectDropTarget(
         <div style={{
             width: '100%',
             height: '100%',
             display: 'flex',
             flexWrap: 'wrap'
           }}>
           <div>
             <None/>
             <Todo/>
             <Ongoing/>
             <Done/>
           </div>
          </div>
       );
  }
}

Board.propTypes = {
  isOver: PropTypes.bool.isRequired
};

export default DropTarget('task' , target, collect)(Board);
