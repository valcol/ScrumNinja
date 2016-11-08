import React, { Component } from 'react';
import { Session } from 'meteor/session';

class RequirementRow extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    Meteor.call('requirement.delete', this.props.userId, this.props.currentProject.name, function(err, res) {
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

  renderRow() {
    return (
      <tr>
        <td>
            {this.props.id}
        </td>
        <td>
            {this.props.desc}
        </td>
        <td>
            {this.props.prio}
        </td>
      </tr>
    );
  }

  render() {
        return this.renderRow();
  }
}

export default RequirementRow;
