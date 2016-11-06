import React, { Component } from 'react';

class BoxFooter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="box-footer">
      {this.props.children}
    </div>
    );
  }
}

export default BoxFooter;
