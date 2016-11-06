import React, { Component } from 'react';
import { Link } from 'react-router';
import { Session } from 'meteor/session';

class LinkItem extends Component {

  constructor(props) {
    super(props);
    this.clearSession = this.clearSession.bind(this);
  }

  clearSession(){
    Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); });
    Session.keys = {};
  }

  render () {
    return (
        <div onClick={this.clearSession}>
          <Link to={this.props.to} className={this.props.className}>{this.props.children}</Link>
        </div>
    );
  }
}

LinkItem.propTypes = {
  className: React.PropTypes.string
};

LinkItem.defaultProps = {
  className:''
};

export default LinkItem;
