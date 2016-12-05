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
    Session.set('success', null);
    Session.set('error', null);
  }

  handleDelete(_id) {
    Meteor.call('userstory.traceability.delete', _id, this.props.currentProject.name, function(err, res) {
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
    return this.props.userstories.filter((userstory) => (!!userstory.trace)).map((userstory) => (
      <tr>
        <td><span style={{backgroundColor: userstory.color}} className='badge'>{userstory.id}</span></td>
        <td>{userstory.description}</td>
        <td><a href={userstory.trace.url}>{userstory.trace.url}</a></td>
        <td>{userstory.trace.date}</td>
        <td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleUpdate(userstory._id); } }
            disabled={!this.props.isPaOrPm}>
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-flat btn-danger pull-right" onClick={ () => { this.handleDelete(userstory._id); } }
            disabled={!this.props.isPaOrPm}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={{width: '10%'}} >
              id
            </th>
            <th style={{width: '40%'}} >
              Description
            </th>
            <th style={{width: '30%'}} >
              Trace
            </th>
            <th style={{width: '20%'}} >
              Date
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
