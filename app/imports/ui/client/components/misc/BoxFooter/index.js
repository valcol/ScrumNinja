import React, { Component } from 'react';

class BoxFooter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="box-footer" style={{marginBottom:'0px',  position: 'absolute',
    bottom: 0}}>
      {this.props.children}
    </div>
    );
  }
}

export default BoxFooter;
