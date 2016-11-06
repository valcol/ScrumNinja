import React, { Component } from 'react';

export class FeedbackMessage extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      this.props.error ?
        <div className="callout callout-danger">
            {this.props.error}
        </div>
      : this.props.success ?
        <div className="callout callout-success">
            {this.props.success}
        </div>
      :
        <div></div>
    );
  }
}
