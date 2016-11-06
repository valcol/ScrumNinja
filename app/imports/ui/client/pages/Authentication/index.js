import React, { Component } from 'react';

class Authentication extends Component {

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }

}

export default Authentication;
