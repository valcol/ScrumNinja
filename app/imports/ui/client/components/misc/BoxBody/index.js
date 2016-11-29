import React, { Component } from 'react';

class BoxBody extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="box-body">
      {this.props.children}
    </div>
    );
  }
}

export default BoxBody;
