import React, { Component } from 'react';
import None from './None.js';
import Todo from './Todo.js';
import Ongoing from './Ongoing.js';
import Done from './Done.js';

class Board extends Component {
  render() {
    return(
    <div>
      <None/>
      <Todo/>
      <Ongoing/>
      <Done/>
    </div>
    );
  }
}
export default Board;
