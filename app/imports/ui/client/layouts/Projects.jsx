import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../api/collections.js';
import { Link } from 'react-router';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(name) {
    Meteor.call('project.delete', name);
  }

  handleSubmit(){
  }

  render() {
    return (
      <div className="row">
        {/* left column */}
        <div className="col-md-12">
          {
          this.props.projects.map((project) => (
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">{project.name}</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body pad">
                <li><Link to={'/p/'+project.name+'/'} className="project" activeStyle={{ color: 'red' }}>Click here to go to this project page</Link></li>
                <button className="btn btn-flat center-block" onClick={ () => { this.handleDelete(project.name); } }>
                  Delete
                </button>
            </div>
            </div>
          ))
          }
          {/* /.box */}
        </div>
        {/* /.row */}
      </div>
      );
    }
}

export default createContainer(() => {
  return {
    projects: Collections.Projects.find({}).fetch()
  };
}, Project);
