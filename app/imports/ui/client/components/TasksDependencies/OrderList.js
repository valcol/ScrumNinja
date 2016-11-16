import React, { Component } from 'react';
import { Session } from 'meteor/session';

class DependencyList extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleDelete(_id) {
    Meteor.call('dependency.delete', _id, this.props.currentProject.name, function(err, res) {
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

    if (this.props.orders.length > 0)
      return this.props.orders[0].list.map((id) => (
        <tr>
          <td>{id}</td>
          <td>{this.getDescription(id)}</td>
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
          </tr>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default DependencyList;
