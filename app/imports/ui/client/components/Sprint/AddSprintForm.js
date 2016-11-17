import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

class AddSprintForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      start: '',
      end: '',
      description: '',
      userstory: []
    };
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBeginChange = this.handleBeginChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleUSChange = this.handleUSChange.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.sprintToEdit) {
      if (nextProps.sprintToEdit !== this.props.sprintToEdit) {
        this.setState({
          _id:nextProps.sprintToEdit._id,
          start: nextProps.sprintToEdit.start,
          end: nextProps.sprintToEdit.end,
          description: nextProps.sprintToEdit.description,
          userstory: nextProps.sprintToEdit.userstory
        });
        Session.set('warning', 'Caution: you are editing an existing Sprint : Sprint#'+nextProps.sprintToEdit.number);
      }
    }
    else {
      this.setState({
        _id:'',
        start: '',
        end: '',
        description: '',
        userstory: []
      });
      Session.set('warning', null);
    }
  }

  handleCancelEdit(event){
    Session.set('sprintToEdit', null);
    Session.set('success', null);
    Session.set('error', null);
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value});
  }
  handleBeginChange(event){
    this.setState({start: event.target.value});
  }
  handleEndChange(event){
    this.setState({end: event.target.value});
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
  handleSubmit(event){
    event.preventDefault();
    Meteor.call('sprint.add', this.state, this.props.currentProject.name, function(err, res) {
      if (err) {
        Session.set('error', err.message);
        Session.set('success', null);
      } else {
        Session.set('success', 'Done !');
        Session.set('error', null);
      }
    });

    if (this.props.sprintToEdit)
      Session.set('sprintToEdit', null);
  }

  renderSelectList(){
    return (
      <div className="pre-scrollable us-select-list">

      <table className="table table-striped">
        <tbody>
          <tr>
            <th >
              Description
            </th>
            <th style={{width: 20}}></th>
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
    return (
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={this.handleSubmit} >
          <div className="input-group">
            {/* Date range */}
            <div className="form-group">
              <label>Start:</label>
              <div className="input-group date">
                <div className="input-group-addon">
                  <i className="fa fa-calendar" />
                </div>
                <input type="date" onChange={this.handleBeginChange} value={this.state.start} id="start" className="form-control pull-right datepicker" required />
              </div>
              {/* /.input group */}
            </div>
            <div className="form-group">
              <label>End:</label>
              <div className="input-group date">
                <div className="input-group-addon">
                  <i className="fa fa-calendar" />
                </div>
                <input type="date" onChange={this.handleEndChange} value={this.state.end} id="end" className="form-control pull-right datepicker" required />
              </div>
              {/* /.input group */}
            </div>
            <input type="text" className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange}/>
            <h4>Users-Stories</h4>
            {this.renderSelectList()}
            <br/>
            {this.props.taskToEdit ?
              <div>
              <div className="col-md-1">
                <button  type="button" onClick={this.handleCancelEdit} className="btn btn-danger btn-block btn-flat">Cancel</button>
              </div>
              <div className="col-md-1">
                <button className="btn btn-primary btn-block btn-flat">Confirm</button>
              </div>
              </div>
              :<button className="btn btn-primary btn-block btn-flat">Add</button>
            }
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default AddSprintForm;
