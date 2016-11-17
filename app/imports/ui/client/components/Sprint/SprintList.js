import React, { Component } from 'react';
import { Session } from 'meteor/session';

class SprintList extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  isVisitorOrPo(){
    let role = this.props.currentProject.roles[Meteor.userId()];
    return (role === 'po' || !role);
  }

  handleDelete(_id) {
    Meteor.call('sprint.delete', _id, function(err, res) {
      if (err) {
        Session.set('error', err.message);
        Session.set('success', null);
      } else {
        Session.set('success', 'Done !');
        Session.set('error', null);
      }
    });
  }

  handleUpdate(_id) {
    Session.set('sprintToEdit', _id);
    Session.set('success', null);
    Session.set('error', null);
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
  return this.props.sprints.map((sprint) => (
    <tr>
      <td>{sprint.start}</td>
      <td>{sprint.end}</td>
      <td>{sprint.description}</td>
      <td>{this.renderUs(sprint.userstory)}</td>
        {!this.props.isVisitorOrPo ?<td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleUpdate(sprint._id); } }>
            Edit
          </button>
        </td>
        : <div></div>}
        {!this.props.isVisitorOrPo ?<td>
          <button className="btn btn-flat btn-danger pull-right" onClick={ () => { this.handleDelete(sprint._id); } }>
            Delete
          </button>
        </td>
        : <div></div>}
    </tr>
  ));
}
render() {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th>
            Begin
          </th>
          <th style={{width: 100}}>
            End
          </th>
          <th style={{width: 100}}>
            Description
          </th>
          <th style={{width: 100}}>
            Associated US
          </th>
        </tr>
        {this.renderRows()}
      </tbody>
    </table>
  );
}
}

export default SprintList;
