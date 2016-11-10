import React, { Component } from 'react';

class UserStoriesList extends Component {

  constructor(props) {
    super(props);
  }

  handleUpdate(_id) {
    //TODO : champs à modifier vont dans la zone de modification
      Meteor.call('userstory.update', _id, function(err, res) {
          if (err) {
              Session.set('error', err.message);
              Session.set('success', null);
          } else {
          Session.set('success', 'Done !');
          Session.set('error', null);
          }
      });
  }

  handleDelete(_id) {
      Meteor.call('userstory.delete', _id, function(err, res) {
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
              disabled={!(this.props.currentProject.roles[Meteor.userId()] === 'pa' || this.props.currentProject.roles[Meteor.userId()] === 'pm')}>
              Update
            </button>
          </td>
          <td>
            <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(userstory._id); } }
              disabled={!(this.props.currentProject.roles[Meteor.userId()] === 'pa' || this.props.currentProject.roles[Meteor.userId()] === 'pm')}>
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
