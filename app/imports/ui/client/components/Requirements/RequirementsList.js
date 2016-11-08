import React, { Component } from 'react';


class RequirementsList extends Component {

  constructor(props) {
    super(props);
  }

  renderRows(){
    return this.props.requirements.map((requirement) => (
     
      // currentProject={this.props.currentProject}
        <tr>
            <th>{requirement.description}</th>
            <th>{requirement.priority}</th>
            <th>{requirement.categorie}</th>
      </tr>
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
        {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default RequirementsList;
