import React, { Component } from 'react';


class SprintList extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);

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

  renderRows(){
    return this.props.sprints.map((sprint) => (
      <tr>
        <td>{sprint.start}</td>
        <td>{sprint.end}</td>
        <td>{sprint.description}</td>
        <td>{sprint.num}</td>
          {
            !this.isVisitorOrPo() ?
            <td> <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(sprint._id); } }>
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
            N°
          </th>
        </tr>
        {this.renderRows()}
      </tbody>
    </table>
  );
}
}

export default SprintList;
