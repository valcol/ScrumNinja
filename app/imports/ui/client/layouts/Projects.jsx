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

  handleDelete(projectName) {
    Meteor.call('project.delete', projectName);
  }


  render() {
    return (
          <div className="projects">
                <div className="box project">
                  <div className="box-header with-border">
                    <h3 className="box-title">Projects which I belong</h3>
                  </div>
                  <div className="box-body pad">
                    <table className="table table-striped">
                      <tbody><tr>
                          <th style={{width: 150}}>Name</th>
                          <th style={{width: 100}}><span className="glyphicon glyphicon-eye-open"></span></th>
                          <th style={{width: 100}}><span className="glyphicon glyphicon-user"></span></th>
                          <th>Progress</th>
                          <th style={{width: 20}}>Dashboard</th>
                          <th style={{width: 20}}>Delete</th>
                        </tr>
                        {
                        this.props.projects.map((project) => (
                        <tr>
                          <td>{project.name}</td>
                          <td>{project.visibility}</td>
                          <td>{Object.keys(project.roles).length}</td>
                          <td>
                            <div className="progress progress-xs">
                              <div className="progress-bar progress-bar-danger" style={{width: '55%'}}></div>
                            </div>
                          </td>
                          <td>
                            <LinkItem to={'/p/'+project.name+'/'} >
                              <button className="btn btn-flat pull-left">
                                Go to Dashboard
                              </button>
                            </LinkItem>
                          </td>
                          <td>
                            <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(project.name); } }
                              disabled={!(project.roles[Meteor.userId()] === 'pa')}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="box project">
                  <div className="box-header with-border">
                    <h3 className="box-title">Public Projects</h3>
                  </div>
                  <div className="box-body pad">
                    <table className="table table-striped">
                      <tbody><tr>
                          <th style={{width: 150}}>Name</th>
                          <th style={{width: 100}}><span className="glyphicon glyphicon-user"></span></th>
                          <th>Progress</th>
                          <th style={{width: 20}}>Dashboard</th>
                        </tr>
                        {
                        this.props.projectsPublic.map((project) => (
                        <tr>
                          <td>{project.name}</td>
                          <td>{Object.keys(project.roles).length}</td>
                          <td>
                            <div className="progress progress-xs">
                              <div className="progress-bar progress-bar-danger" style={{width: '55%'}}></div>
                            </div>
                          </td>
                          <td>
                            <LinkItem to={'/p/'+project.name+'/'} >
                              <button className="btn btn-flat pull-left">
                                Go to Dashboard
                              </button>
                            </LinkItem>
                          </td>
                        </tr>
                      ))
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
      );
    }
}

export default createContainer(() => {
  const projects = Collections.Projects.find({['roles.'+Meteor.userId()]:{$exists : true}}).fetch();
  const projectsPublic = Collections.Projects.find({['roles.'+Meteor.userId()]:{$exists : false}}).fetch();
  const exists = !!projects && !!projectsPublic;
  return {
    exists,
    projects: exists ? projects : [],
    projectsPublic: exists ? projectsPublic : []
  };
}, Project);
