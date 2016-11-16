import React, { Component } from 'react';
import { Session } from 'meteor/session';

class DependencyList extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(_id) {
    Meteor.call('dependencies.delete', _id, this.props.currentProject.name, function(err, res) {
      if (err) {
        Session.set('error', err.message);
        Session.set('success', null);
      } else {
        Session.set('success', 'Done !');
        Session.set('error', null);
      }
    });
  }


  getDescription(id){
    for (task of this.props.tasks)
      if (id === task.id)
      return task.description;
  }

  renderRows(){

    return this.props.dependencies.map((dependency) => (
      <tr>
        <td>{dependency.edge[0]}</td>
        <td>{this.getDescription(dependency.edge[0])}</td>
        <td>need to be completed before</td>
        <td>{dependency.edge[1]}</td>
        <td>{this.getDescription(dependency.edge[1])}</td>
        {this.props.isPaOrPm ?<td>
          <button className="btn btn-flat btn-danger pull-right" onClick={ () => { this.handleDelete(dependency._id); } }>
            Delete
          </button>
        </td>
        : <div></div>}
      </tr>
    ));
  }

  render() {
    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={{width: 20}} >
              #
            </th>
            <th >
              Description
            </th>
            <th >

            </th>
            <th style={{width: 20}} >
              #
            </th>
            <th >
              Description
            </th>
            <th style={{width: 20}}></th>
          </tr>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default DependencyList;
