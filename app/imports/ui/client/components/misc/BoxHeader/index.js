import React, { Component } from 'react';

class BoxHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="box-header with-border">
      <h3 className="box-title">
        {this.props.children}
      </h3>
    </div>
    );
  }
}

export default BoxHeader;
