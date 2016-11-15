import React, { Component } from 'react';
import { Session } from 'meteor/session';

class RequirementsList extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);

  }

  isVisitorOrPo(){
    let role = this.props.currentProject.roles[Meteor.userId()];
    return (role === 'po' || !role);
  }

  handleDelete(_id) {
    Meteor.call('requirement.delete', _id, function(err, res) {
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
    return this.props.requirements.map((requirement) => (
      <tr>
        <td>{requirement.id}</td>
        <td>{requirement.description}</td>
        <td>{requirement.priority}</td>
        {
          !this.isVisitorOrPo() ?
          <td> <button className="btn btn-flat btn-danger pull-right" onClick={ () => { this.handleDelete(requirement._id); } }>
            Delete
          </button>
        </td>
        :<div></div>
    }
  </tr>
));
}

render() {
  return (
    <table className="table table-striped">
      <tbody>
        <tr>
          <th style={{width: 50}}>
            #
          </th>
          <th>
            Description
          </th>
          <th style={{width: 100}}>
            Priority
          </th>
          {
            !this.isVisitorOrPo() ?
            <th style={{width: 100}}>
            </th>
            :<div></div>
        }
      </tr>
      {this.renderRows()}
    </tbody>
  </table>
);
}
}

export default RequirementsList;
