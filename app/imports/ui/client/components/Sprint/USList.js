import React, { Component } from 'react';


class USList extends Component {

  constructor(props) {
    super(props);
  }

  isVisitorOrPo(){
    let role = this.props.currentProject.roles[Meteor.userId()];
    return (role === 'po' || !role);
  }

  renderRows(){
    return this.props.userstories.map((userstory) => (

      <tr>
        <td><input type="checkbox" /></td>
        <td>{userstory.id}</td>
        <td>{userstory.description}</td>
        <td>{userstory.effort}</td>
        <td>{userstory.priority}</td>
      </tr>
    ));
  }

  render() {
    return (
      <table className="table">
        <tbody>
          <tr>
            <th></th>
            <th style={{width: '10%'}} >
              id
            </th>
            <th style={{width: '40%'}} >
              Description
            </th>
            <th style={{width: '20%'}} >
              Effort
            </th>
            <th style={{width: '20%'}} >
              Priority
            </th>
            <th>
            </th>
            <th>
            </th>
          </tr>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}
export default USList;
