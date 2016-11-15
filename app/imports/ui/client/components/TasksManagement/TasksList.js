import React, { Component } from 'react';
import { Session } from 'meteor/session';

class TasksList extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpdate(_id) {
    Session.set('taskToEdit', _id);
  }

  handleDelete(_id) {
    Meteor.call('tasks.delete', _id, this.props.currentProject.name, function(err, res) {
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
    return this.props.tasks.map((task) => (
      ((this.props.currentUS === 'all')||(task.userstory.indexOf(this.props.currentUS) > -1)) ?
      <tr>
        <td>{task.id}</td>
        <td>{task.description}</td>
        <td>{task.effort}</td>
        <td>{task.userstory[0]}</td>
        <td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleUpdate(task._id); } }
            disabled={!this.props.isPaOrPm}>
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(task._id); } }
            disabled={!this.props.isPaOrPm}>
            Delete
          </button>
        </td>
      </tr>
      : ''
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
              Associated US
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

export default TasksList;
