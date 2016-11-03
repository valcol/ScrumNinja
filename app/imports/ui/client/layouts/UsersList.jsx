import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../api/collections.js';
import  { UserRow }  from './UserRow.jsx';

class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(name) {
    Meteor.call('project.delete', name);
  }

  renderRows(roles){
    let isAdmin = (this.props.currentProject.roles[Meteor.userId()] === 'pa');
    return Object.keys(roles).map((key) => (
      <UserRow
        isAdmin={isAdmin}
        role={roles[key]}
        projectName = {this.props.projectName}
        userId={key}
      />
    ));
  }

  render() {
    return (
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Members</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body pad">
                <div className="table-responsive">
                  <table className="table">
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Role
                      </th>
                    </tr>
                  {this.renderRows(this.props.currentProject.roles)}
                  </table>
                </div>
            </div>
      </div>
      );
    }
}

export default createContainer((props) => {
  return {
    currentProject: Collections.Projects.findOne({name:props.projectName})
  };
}, UsersList);
