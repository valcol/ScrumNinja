import React, { Component } from 'react';

class FeedbackMessage extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.error)
      return (
        <div className="callout callout-danger">
          {this.props.error}
        </div>
      );
    else if (this.props.success)
      return (
        <div className="callout callout-success">
          {this.props.success}
        </div>
      );
    else return (<div></div>);
  }
}

export default FeedbackMessage;
