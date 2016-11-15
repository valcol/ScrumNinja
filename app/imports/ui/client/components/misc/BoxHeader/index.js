import React, { Component } from 'react';

class BoxHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="box-header with-border">
      <h4 className="box-title">
        {this.props.children}
      </h4>
    </div>
    );
  }
}

export default BoxHeader;
