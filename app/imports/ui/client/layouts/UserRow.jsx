import React, { Component } from 'react';

export class UserRow extends Component {

  constructor(props) {
    super(props);
    this.state = {role: this.props.role};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({role: event.target.value});
    Meteor.call('permission.upsert', this.props.userId, this.props.projectName, this.state.role);
  }

  render() {
    let roleReadable = {pa:'Administrator', pm:'Member', po:'Product Owner'};
    return (
        <tr>
          <td>
            {Meteor.users.findOne({_id:this.props.userId}).username}
          </td>
          <td>
            {
              this.props.isAdmin ?
              <select value={this.state.role} onChange={this.handleChange} className="form-control">
                <option value='pa'>Administrator</option>
                <option value='pm'>Member</option>
                <option value='po'>Product Owner</option>
              </select>
            :
            roleReadable[this.state.role]
          }
          </td>
          <td>
            {Meteor.users.findOne({_id:this.props.userId}).username}
          </td>
        </tr>
    );
  }
}
