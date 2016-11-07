import React, { Component } from 'react';
import RequierementsBox from '../../components/Requierements'

class Requierements extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="requierements">
        <RequierementsBox {...this.props}/>
      </div>
    );
  }
}

export default Requierements;
