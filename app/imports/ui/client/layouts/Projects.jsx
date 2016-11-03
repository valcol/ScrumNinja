import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../api/collections.js';
import { Link } from 'react-router';
import  { LinkItem }  from '../layouts/LinkItem.jsx';


class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(projectId) {
    Meteor.call('project.delete', projectId);
  }

  render() {
    return (
      <div className="projects">
          {
          this.props.projects.map((project) => (
            <div className="box project">
              <div className="box-header with-border">
                <h3 className="box-title">{project.name}</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body pad">
                <div className="table-responsive">
                  <table className="table">
                    <tr>
                    <td>
                      <LinkItem to={'/p/'+project.name+'/'} >
                        <button className="btn btn-flat pull-left">
                          Go to Dashboard
                        </button>
                      </LinkItem>
                    </td>
                    <td>
                      <span className="badge bg-green">Admin</span>
                    </td>
                    <td>
                      <span className="glyphicon glyphicon-user"></span>
                       16
                    </td>
                    <td>
                      <span className="glyphicon glyphicon-time"></span>
                         {project.start.toISOString().substring(0, 10)} to {project.end.toISOString().substring(0, 10)}
                    </td>
                    <td>
                      <span className="glyphicon glyphicon-eye-open"></span>
                         {project.visibility}
                    </td>
                    <td>
                      <span className="badge bg-red">20%</span>
                    </td>
                    <td>
                      <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(project._id); } }>
                        Delete
                      </button>
                    </td>
                  </tr>
                  </table>
                </div>
                <div className="description">
                    <b>Project description:</b>
                    <p>{project.description}</p>
                </div>
            </div>
            </div>
          ))
          }
          {/* /.box */}
      </div>
      );
    }
}

export default createContainer(() => {
  return {
    projects: Collections.Projects.find({}).fetch()
  };
}, Project);
