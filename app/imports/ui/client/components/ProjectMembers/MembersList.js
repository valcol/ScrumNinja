import React, { Component } from 'react';
import  MemberRow  from './MemberRow.js';

class MembersList extends Component {

  constructor(props) {
    super(props);
  }

  renderRows(roles){
    return Object.keys(roles).map((key) => (
      <MemberRow
        role={roles[key]}
        userId={key}
        isAdmin={this.props.isAdmin}
        currentProject={this.props.currentProject}
        />
    ));
  }

  render() {
    return (
      <table className="table">
        <tbody>
        <tr>
          <th>
            Name
          </th>
          <th>
            Role
          </th>
        </tr>
        {this.renderRows(this.props.currentProject.roles)}
        </tbody>
      </table>
    );
  }
}

export default MembersList;
