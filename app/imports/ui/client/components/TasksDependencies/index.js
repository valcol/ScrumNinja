import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import {Meteor} from 'meteor/meteor';

import DependenciesList  from './DependenciesList.js';
import OrderList  from './OrderList.js';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import AddDependencyForm from './AddDependencyForm.js';
import Loading from '../misc/Loading';

class TasksManagementBox extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  isPaOrPm(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'pa' || this.props.currentProject.roles[Meteor.userId()] === 'pm');
  }

  handleChange(event){
    this.setState({currentUS: parseInt(event.target.value)});
  }


  renderSelectList(){
    return (
      <select value={this.state.currentUs} onChange={this.handleChange} className="form-control">
        <option value='0'>All</option>
        {this.props.userstories.map((task) => (
            <option value={userstory.id}>US#{userstory.id} : {userstory.description}</option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Tasks
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
          <BoxBody>
            <div className="row">
              <div className="col-md-8">
                <h4>Dependencies</h4>
                <DependenciesList currentProject={this.props.currentProject}
                  tasks={this.props.tasks}
                  dependencies={this.props.dependencies}
                  isPaOrPm={this.isPaOrPm()}/>
              </div>
              <div className="col-md-4">
                <h4>Order</h4>
                <OrderList currentProject={this.props.currentProject}
                  tasks={this.props.tasks}
                  orders={this.props.orders}
                />
              </div>
            </div>
          </BoxBody>
        }
        {(!this.props.loaded)  ? <BoxFooter></BoxFooter> :
          this.isPaOrPm() ?
          <BoxFooter>
            <FeedbackMessage
              error={this.props.error}
              success={this.props.success}
              />
            <FeedbackMessage
              warning={this.props.warning}
              />
            <AddDependencyForm currentProject={this.props.currentProject}
              userstories={this.props.userstories}
              tasks={this.props.tasks}
              taskToEdit={this.props.taskToEdit}
              />
          </BoxFooter>
          : <div></div>
        }
        {!this.props.loaded ? <Loading/> : ''}
      </Box>
    );
  }
}

export default createContainer((props) => {
  const subscribeTaskOrder = Meteor.subscribe('tasks.orders', props.currentProject.name);
  const orders = Collections.TasksOrders.find({}).fetch();
  const subscribeTaskDep = Meteor.subscribe('tasks.dependencies', props.currentProject.name);
  const dependencies = Collections.TasksDependencies.find({}, {sort: {id: 1}}).fetch();
  const subscribeUs = Meteor.subscribe('userstories', props.currentProject.name);
  const userstories = Collections.UserStories.find({}, {sort: {id: 1}}).fetch();
  const subscribeT = Meteor.subscribe('tasks', props.currentProject.name);
  const tasks = Collections.Tasks.find({}, {sort: {id: 1}}).fetch();
  const loaded = !!tasks && !!subscribeUs && !!subscribeT && !!userstories && !!subscribeTaskOrder && !!subscribeTaskDep && !!dependencies && !!orders;
  const dependencyToEdit = Session.get('dependencyToEdit') ? Collections.Tasks.findOne({_id:Session.get('dependencyToEdit')}) : null;
  return {
    error: Session.get('error'),
    success: Session.get('success'),
    warning: Session.get('warning'),
    loaded,
    tasks: loaded ? tasks : [],
    userstories: loaded ? userstories : [],
    dependencies: loaded ? dependencies : [],
    orders: loaded ? orders : [],
    dependencyToEdit
  };
}, TasksManagementBox);
