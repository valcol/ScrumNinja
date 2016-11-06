import React, { Component } from 'react';
import { Link } from 'react-router';

import NavItem from '../../components/misc/NavItem';

class Menu extends Component {
  render() {
    return (
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar Menu */}
          { this.props.projectName ?
            <ul className="sidebar-menu">
              <li className="header">HOME</li>
              {/* Optionally, you can add icons to the links */}
              <NavItem to='/u/projects' ><i className="fa ion-home" /><span>My Projects</span></NavItem>
              <NavItem to='/u/newproject' ><i className="fa ion-android-add-circle" /><span>Create a Project</span></NavItem>
              <NavItem to='/u/profile' ><i className="fa ion-android-person" /><span>My Profile</span></NavItem>
              <li className="header text-uppercase">{this.props.projectName}</li>
              <NavItem to={'/p/'+this.props.projectName+'/dashboard'} ><i className="fa ion-android-options" /><span>Dashboard</span></NavItem>
              <NavItem to={'/p/'+this.props.projectName+'/specifications'} ><i className="fa ion-clipboard" /><span>Specifications</span></NavItem>
              <NavItem to={'/p/'+this.props.projectName+'/requierements'} ><i className="fa fa-link" /><span>Requierements</span></NavItem>
              <NavItem to={'/p/'+this.props.projectName+'/userstories'} ><i className="fa ion-film-marker" /><span>User Stories</span></NavItem>
              <li className="treeview">
                <a href="#"><i className="fa ion-wrench" /> <span>Tasks</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <NavItem to={'/p/'+this.props.projectName+'/tasks'} >Tasks Management</NavItem>
                <NavItem to={'/p/'+this.props.projectName+'/tasks'} >Tasks Dependencies</NavItem>
              </ul>
            </li>
            <NavItem to={'/p/'+this.props.projectName+'/sprint'} ><i className="fa ion-clock" /><span>Sprint</span></NavItem>
            <NavItem to={'/p/'+this.props.projectName+'/scrumboard'} ><i className="fa ion-easel" /><span>ScrumBoard</span></NavItem>
            <NavItem to={'/p/'+this.props.projectName+'/traceability'} ><i className="fa ion-pull-request" /><span>Traceability</span></NavItem>
          </ul>
          :
          <ul className="sidebar-menu">
            <li className="header">HOME</li>
            {/* Optionally, you can add icons to the links */}
            <NavItem to='/u/projects' ><i className="fa ion-home" /><span>My Projects</span></NavItem>
            <NavItem to='/u/newproject' ><i className="fa ion-android-add-circle" /><span>Create a Project</span></NavItem>
            <NavItem to='/u/profile' ><i className="fa ion-android-person" /><span>My Profile</span></NavItem>
          </ul>
        }
        {/* /.sidebar-menu */}
      </section>
      {/* /.sidebar */}
    </aside>
  );
}
}

export default Menu;
