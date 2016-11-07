import React, { Component } from 'react';
import  RequierementRow  from './RequierementRow.js';

class RequierementsList extends Component {

  constructor(props) {
    super(props);
  }

  renderRows(roles){
    return Object.keys(roles).map((key) => (
      <RequierementRow
        role={roles[key]}
        userId={key}
        isVisitorOrPo={this.props.isVisitorOrPo}
        currentProject={this.props.currentProject}
        />
    ));
  }

  render() {
    return (
      <table className="table">
        <tbody>
        <tr>
          <th style={{width: 100}}>
            Id
          </th>
          <th>
            Description
          </th>
          <th style={{width: 100}}>
            Priority
          </th>
          <th style={{width: 100}}>
            Delete
          </th>
        </tr>
        {this.renderRows(this.props.requierements)}
        </tbody>
      </table>
    );
  }
}

export default RequierementsList;
