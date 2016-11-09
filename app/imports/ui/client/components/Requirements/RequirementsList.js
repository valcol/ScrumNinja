import React, { Component } from 'react';


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
            <td>{requirement.description}</td>
            <td>{requirement.priority}</td>
        {
        !this.isVisitorOrPo() ?   
        <td> <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(requirement._id); } }>
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
            Description
          </th>
          <th style={{width: 100}}>
            Priority
          </th>
          <th style={{width: 100}}>
            Delete
          </th>
        </tr>
        {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default RequirementsList;
