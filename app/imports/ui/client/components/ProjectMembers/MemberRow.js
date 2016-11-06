import React, { Component } from 'react';
import { Session } from 'meteor/session';

class MemberRow extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    Meteor.call('permission.delete', this.props.userId, this.props.currentProject.name, function(err, res) {
      if (err) {
       Session.set('error', err.message);
       Session.set('success', null);
      } else {
       Session.set('success', 'Done !');
       Session.set('error', null);
      }
   });
  }

  handleChange(event) {
    Meteor.call('permission.upsert', this.props.userId, this.props.currentProject.name, event.target.value, function(err, res) {
      if (err) {
       Session.set('error', err.message);
       Session.set('success', null);
     } else {
       Session.set('success', 'Done !');
       Session.set('error', null);
     }
   });
  }

  renderAdminRow(){
    return (
      <tr>
        <td>
          {Meteor.users.findOne({_id:this.props.userId}).username}
        </td>
        <td>
          <select value={this.props.role} onChange={this.handleChange} className="form-control">
            <option value='pa'>Administrator</option>
            <option value='pm'>Member</option>
            <option value='po'>Product Owner</option>
          </select>
        </td>
        <td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(); } }>
            Delete
          </button>
        </td>
      </tr>
    );
  }

  renderRow() {
    let roleReadable = {pa:'Administrator', pm:'Member', po:'Product Owner'};
    return (
      <tr>
        <td>
          {Meteor.users.findOne({_id:this.props.userId}).username}
        </td>
        <td>
        {roleReadable[this.props.role]}
        </td>
      </tr>
    );
  }

  render() {
      if (this.props.isAdmin)
        return this.renderAdminRow();
      else
        return this.renderRow();
  }
}

export default MemberRow;
