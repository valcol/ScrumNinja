import React, { Component } from 'react';
import { Session } from 'meteor/session';

class UserStoriesList extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpdate(_id) {
    Session.set('userstoryToEdit', _id);
  }

  handleDelete(_id) {
    Meteor.call('userstory.delete', _id, this.props.currentProject.name, function(err, res) {
      if (err) {
        Session.set('error', err.message);
        Session.set('success', null);
      } else {
        Session.set('success', 'Done !');
        Session.set('error', null);
      }
    });
  }

  renderRows(){
    return this.props.userstories.map((userstory) => (
      <tr>
        <td>{userstory.id}</td>
        <td>{userstory.description}</td>
        <td>{userstory.effort}</td>
        <td>{userstory.priority}</td>
        <td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleUpdate(userstory._id); } }
            disabled={!this.props.isPaOrPm}>
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(userstory._id); } }
            disabled={!this.props.isPaOrPm}>
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

export default UserStoriesList;
