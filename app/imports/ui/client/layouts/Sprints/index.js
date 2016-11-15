import React, { Component } from 'react';
import SprintBox from '../../components/Sprint';

class Requirements extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="requirements">
        <SprintBox {...this.props}/>
      </div>
    );
  }
}

export default Requirements;
