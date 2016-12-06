import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
  }

  handleSubmitLogout(event) {
    event.preventDefault();
    Meteor.logout();
    window.location.href = '/r/login';
  }

  render() {
    return (
      <header className="main-header">
        {/* Logo */}
        <a href="/" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini"><img src="/img/logo.png"alt="logo"></img></span>
          {/* logo for regular state and mobile devices */}
          <span className="logo-lg"><img src="/img/logo-wide.png"alt="logo"></img></span>
        </a>
        {/* Header Navbar */}
        <nav className="navbar navbar-static-top" role="navigation">
          {/* Sidebar toggle button*/}
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          {/* Navbar Right Menu */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {/* Tasks Menu */}
              <li className="dropdown tasks-menu">
                {/* Menu Toggle Button */}
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-flag-o" />
                  <span className="label label-danger">9</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have 9 tasks</li>
                  <li>
                    {/* Inner menu: contains the tasks */}
                    <ul className="menu">
                      <li>{/* Task item */}
                        <a href="#">
                          {/* Task title and progress text */}
                          <h3>
                            Design some buttons
                            <small className="pull-right">20%</small>
                          </h3>
                          {/* The progress bar */}
                          <div className="progress xs">
                            {/* Change the css width attribute to simulate progress */}
                            <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                              <span className="sr-only">20% Complete</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* end task item */}
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="#">View all tasks</a>
                  </li>
                </ul>
              </li>
              {/* User Account Menu */}
              <li className="dropdown user user-menu">
                {/* Menu Toggle Button */}
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  {/* The user image in the navbar*/}
                  {/* hidden-xs hides the username on small devices so only the image appears. */}
                  <span>{this.props.user.username}</span>
                </a>
                <ul className="dropdown-menu">
                  {/* Menu Body */}
                  {/* Menu Footer*/}
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="profile" className="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div className="pull-right">
                      <button onClick={this.handleSubmitLogout} className="btn btn-default btn-flat">Sign out</button>
                    </div>
                  </li>
                </ul>
              </li>
              {/* Control Sidebar Toggle Button */}
              <li>
                <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears" /></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user() || {}
  };
}, Header);
