import React, { Component } from 'react';
import UsersList from './UsersList.jsx';

export class Dashboard extends Component {

  render() {
    return (
      <UsersList projectName = {this.props.projectName}/>
    );
  }

}
