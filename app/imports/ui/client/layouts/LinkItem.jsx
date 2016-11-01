import React, { Component } from 'react';
import { Link } from 'react-router';
import { Session } from 'meteor/session';

export class LinkItem extends Component {
  render () {
    Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); });
    Session.keys = {};

    return (
        <Link to={this.props.to}>{this.props.children}</Link>
    );
  }
}
