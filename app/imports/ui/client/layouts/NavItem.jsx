import React, { Component } from 'react';
import { Link, IndexLink, withRouter } from 'react-router';
import { Session } from 'meteor/session';

class NavItem extends Component {
  render () {
    Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); });
    Session.keys = {};

    const { router } = this.props;
    const { index, to, children, ...props } = this.props;

    let isActive;
    if( router.isActive('/',true) && index )
      isActive = true;
    else
      isActive = router.isActive(to);
    const LinkComponent = index ?  IndexLink : Link;

    return (
      <li className={isActive ? 'active' : ''}>
        <LinkComponent to={to} {...props}>{children}</LinkComponent>
      </li>
    )
  }
}

NavItem = withRouter(NavItem);

export {NavItem};
