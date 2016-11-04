import React, { Component } from 'react';
import UsersList from './UsersList.jsx';

export class Dashboard extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-lg-6">
          <UsersList projectName = {this.props.projectName}/>
        </div>
      </div>
    );
  }

}
