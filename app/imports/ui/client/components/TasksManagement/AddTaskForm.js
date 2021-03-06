import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';

class addTaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      description: '',
      userstory: [],
      state: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUSChange = this.handleUSChange.bind(this),
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.taskToEdit) {
      if (nextProps.taskToEdit !== this.props.taskToEdit) {
        this.setState({
          id: nextProps.taskToEdit.id,
          description: nextProps.taskToEdit.description,
          userstory: nextProps.taskToEdit.userstory,
          state:  nextProps.taskToEdit.state
        });
        Session.set('warning', 'Caution: you are editing an existing Task : Task #'+nextProps.taskToEdit.id);
      }
    }
    else {
      this.setState({
        id: 0,
        description: '',
        state: 1,
        userstory: []
      });
      Session.set('warning', null);
    }
  }

  handleChange(key, isInt) {
    return function (e) {
      let state = {};
      if (isInt)
      state[key] = parseInt(e.target.value);
      else
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleUSChange(id) {
    let userstory;
    if (this.state.userstory.indexOf(parseInt(id)) > -1)
    userstory = this.state.userstory.filter(function(item) {
      return item !== parseInt(id);
    });
    else
    userstory = this.state.userstory.concat(parseInt(id));

    this.setState({
      userstory
    });
  }

  handleCancelEdit(event){
    Session.set('taskToEdit', null);
    Session.set('success', null);
    Session.set('error', null);
  }

  handleSubmit(e){
    e.preventDefault();
    Meteor.call('tasks.update', this.state, this.props.currentProject.name,
    function(err, res) {
      if (err) {
        Session.set('error', err.message);
        Session.set('success', null);
      } else {
        Session.set('success', 'Done !');
        Session.set('error', null);
      }
    });

    if (this.props.taskToEdit)
    Session.set('taskToEdit', null);
  }


  renderSelectList(){
    return (
      <div className="pre-scrollable us-select-list">

        <table className="table table-striped">
          <tbody>
            <tr>
              <th style={{width: '10%'}} >
                #
              </th>
              <th >
                Description
              </th>
              <th style={{width: '10%'}} ></th>
            </tr>
            {this.props.userstories.map((userstory) => (
              <tr>
                <td style={{width: 20}} >
                  <span style={{backgroundColor: userstory.color}} className='badge'>{userstory.id}</span>
                </td>
                <td >
                  {(this.state.userstory.indexOf(parseInt(userstory.id)) > -1) ?
                    <del>{userstory.description}</del>
                    : <p>{userstory.description}</p>
                }
              </td>
              <td>
                <input type="checkbox" onChange={ () => { this.handleUSChange(userstory.id)}}
                  checked={(this.state.userstory.indexOf(parseInt(userstory.id)) > -1)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

render(){

  let states =  ['None','To Do', 'On Going', 'In Testing', 'Done'];
  let statesClass = ['bg-purple','bg-red', 'bg-yellow', 'bg-blue', 'bg-green'];

  return (

    <div className="row">
      <div className="col-lg-12">
        <h4>Add/Edit a task</h4>

        <form onSubmit={this.handleSubmit} >

          <div className="col-md-2">
            <select value={this.state.state} className={statesClass[this.state.state]}  onChange={this.handleChange('state', true)} className="form-control" required>
              {states.map((state, i) => (
                <option value={i} className={statesClass[i]} >{states[i]}</option>
              ))}
            </select>
          </div>
          <div className="col-md-8">
            <input placeholder="Description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange('description', false)} required/>
          </div>
          {this.props.taskToEdit ?
            <div>
              <div className="col-md-1">
                <button  type="button" onClick={this.handleCancelEdit} className="btn btn-danger btn-block btn-flat">Cancel</button>
              </div>
              <div className="col-md-1">
                <button className="btn btn-primary btn-block btn-flat">Confirm</button>
              </div>
            </div>
            : <div className="col-md-2">
            <button className="btn btn-primary btn-block btn-flat">Add</button>
          </div>}
          <br/>
          {this.renderSelectList()}
        </form>
      </div>
    </div>
  );
}
}

export default addTaskForm;
