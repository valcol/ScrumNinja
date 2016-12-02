import React, { Component } from 'react';
import TraceabilityBox from '../../components/Traceability';

class Traceability extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="traceability">
        <TraceabilityBox {...this.props}/>
      </div>
    );
  }
}

export default Traceability;
