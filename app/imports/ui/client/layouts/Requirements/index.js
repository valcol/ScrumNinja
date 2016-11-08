import React, { Component } from 'react';
import RequirementsBox from '../../components/Requirements'

class Requirements extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="requirements">
        <RequirementsBox {...this.props}/>
      </div>
    );
  }
}

export default Requirements;
