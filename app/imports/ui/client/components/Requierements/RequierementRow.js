import React, { Component } from 'react';
import { Session } from 'meteor/session';

class RequierementRow extends Component {

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

  renderRow() {
    return (
      <tr>
        <td>
          test
        </td>
        <td>
          test
        </td>
        <td>
        test
        </td>
      </tr>
    );
  }

  render() {
        return this.renderRow();
  }
}

export default RequierementRow;
