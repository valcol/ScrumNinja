import React, { Component } from 'react';
import { Link } from 'react-router';

export class Menu extends Component {
  render() {
    return (
        <div>
          <span>
          <h3>Menu</h3>
          <li><Link to='/u/projects' 
            activeStyle={{ color: 'red' }}>My Projects</Link></li>
          <li><Link to='/u/newproject'
            activeStyle={{ color: 'red' }}>New Project</Link></li>
          <li><Link to='/u/profile'
            activeStyle={{ color: 'red' }}>Profile</Link></li>
          </span>
          { this.props.projectName ?
            <span>
            <h3>Menu for {this.props.projectName}</h3>
            <li><Link to={'/p/'+this.props.projectName+'/dashboard'}
              activeStyle={{ color: 'red' }}>Dashboard</Link></li>
            <li><Link to={'/p/'+this.props.projectName+'/specifications'}
              activeStyle={{ color: 'red' }}>Specifications</Link></li>
            <li><Link to={'/p/'+this.props.projectName+'/requierements'}
              activeStyle={{ color: 'red' }}>Requierements</Link></li>
            <li><Link to={'/p/'+this.props.projectName+'/userstories'}
              activeStyle={{ color: 'red' }}>User Stories</Link></li>
            <li><Link to={'/p/'+this.props.projectName+'/tasks'}
              activeStyle={{ color: 'red' }}>Tasks</Link></li>
            <li><Link to={'/p/'+this.props.projectName+'/sprint'}
              activeStyle={{ color: 'red' }}>Sprint</Link></li>
            <li><Link to={'/p/'+this.props.projectName+'/scrumboard'}
              activeStyle={{ color: 'red' }}>Scrum Board</Link></li>
            <li><Link to={'/p/'+this.props.projectName+'/traceability'}
              activeStyle={{ color: 'red' }}>Traceability</Link></li>
            </span>
            :
            <span></span>
          }
        </div>
      );
    }
}
