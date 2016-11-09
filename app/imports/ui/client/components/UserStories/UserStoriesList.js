import React, { Component } from 'react';


class UserStoriesList extends Component {

  constructor(props) {
    super(props);
  }

  renderRows(){
    return this.props.userstories.map((userstory) => (
     
        <tr> //changer th vers td
            <th>{userstory.id}</th>
            <th>{userstory.description}</th>
            <th>{userstory.effort}</th>
            <th>{userstory.priority}</th>
                    <td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(userstory._id); } }
            disabled={!(project.roles[Meteor.userId()] === 'pa')}>
            Delete
          </button>
        </td>

      </tr>
    ));
  }

  render() {
    return (
      <table className="table">
        <tbody>
        <tr>
          <th>
            id
          </th>
          <th>
            Description
          </th>
          <th>
            Effort
          </th>
          <th>
            Priority
          </th>
          <th>
            Update
          </th>
          <th>
            Delete
          </th>
        </tr>
        {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default UserStoriesList;
