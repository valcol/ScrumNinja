import React, { Component } from 'react';
import  RequirementRow  from './RequirementRow.js';

class RequirementsList extends Component {

  constructor(props) {
    super(props);
  }

  renderRows(roles){
    return this.props.requirements.map((requirement) => (
      <RequirementRow
       desc= {requirement.description}
       prio={requirement.priority}
       categorie = {requirement.categorie}
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
            Description
          </th>
          <th style={{width: 100}}>
            Priority
          </th>
          <th style={{width: 100}}>
            Delete
          </th>
        </tr>
        {this.renderRows(this.props.requirements)}
        </tbody>
      </table>
    );
  }
}

export default RequirementsList;
