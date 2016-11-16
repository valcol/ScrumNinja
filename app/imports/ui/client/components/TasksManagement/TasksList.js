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
    Session.set('success', null);
    Session.set('error', null);
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

  getColor(id){
    for (userstory of this.props.userstories)
      if (id === userstory.id)
      return userstory.color;
  }

  renderUs(userstories){
    return userstories.sort().map((userstory) => (<span className='badge' style={{backgroundColor: this.getColor(userstory)}} >#{userstory}</span>));
  }

  renderRows(){

    let states =  ['None','To Do', 'On Going', 'In Testing', 'Done'];
    let statesClass = ['bg-purple','bg-red', 'bg-yellow', 'bg-blue', 'bg-green'];

    return this.props.tasks.map((task) => (
      ((this.props.currentUS === 0)||(task.userstory.indexOf(this.props.currentUS) > -1)) ?
      <tr>
        <td>{task.id}</td>
        <td>{task.description}</td>
        <td><span className={'badge '+statesClass[task.state]}>{states[task.state]}</span></td>
        <td>{this.renderUs(task.userstory)}</td>
        {this.props.isPaOrPm ?<td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleUpdate(task._id); } }>
            Edit
          </button>
        </td>
        : <div></div>}
        {this.props.isPaOrPm ?<td>
          <button className="btn btn-flat btn-danger pull-right" onClick={ () => { this.handleDelete(task._id); } }>
            Delete
          </button>
        </td>
        : <div></div>}
      </tr>
      : <span></span>
    ));
  }

  render() {
    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={{width: 20}} >
              #
            </th>
            <th >
              Description
            </th>
            <th >
              State
            </th>
            <th style={{width: 150}} >
              Associated US
            </th>
            <th style={{width: 20}}></th>
            <th style={{width: 20}}></th>
          </tr>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default TasksList;
