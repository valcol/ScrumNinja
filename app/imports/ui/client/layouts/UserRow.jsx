import React, { Component } from 'react';
import { Session } from 'meteor/session';

export class UserRow extends Component {

  constructor(props) {
    super(props);
    this.state = {role: this.props.role};
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    Meteor.call('permission.delete', this.props.userId, this.props.projectName);
  }

  handleChange(event) {
    this.setState({role: event.target.value});
    Meteor.call('permission.upsert', this.props.userId, this.props.projectName, event.target.value, function(err, res) {
     if (err) {
       Session.set('error', err.message);
       Session.set('success', null);
     } else {
       Session.set('success', 'Done !');
       Session.set('error', null);
     }
   });
  }

  render() {
    let roleReadable = {pa:'Administrator', pm:'Member', po:'Product Owner'};
    if (this.props.isAdmin)
      return (
            <tr>
              <td>
                {Meteor.users.findOne({_id:this.props.userId}).username}
              </td>
              <td>
                <select value={this.state.role} onChange={this.handleChange} className="form-control">
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
  else
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
}
