import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

class addUserStoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      description: '',
      effort: 0,
      priority: 0,
      projectName: this.props.currentProject.name
    };
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEffortChange = this.handleEffortChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleIdChange(event){
    this.setState({id: event.target.value});
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value});
  }

  handleEffortChange(event){
    this.setState({effort: event.target.value});
  }

  handlePriorityChange(event){
    this.setState({priority: event.target.value});
  }

  handleSubmit(){
    Meteor.call('userstory.add', this.state.id,
                this.state.description, this.state.effort,
                this.state.priority, this.state.projectName,
                function(err, res) {
     if (err) {
       Session.set('error', err.message);
       Session.set('success', null);
     } else {
       Session.set('success', 'Done !');
       Session.set('error', null);
     }
   });
  }

  render(){
    return (
      <div className="row">

        <div className="col-lg-12">
          <div className="input-group">
            <input style={{width: '10%'}} placeholder="Identifiant" type="text" className="form-control" value={this.state.id} onChange={this.handleIdChange}/>
            <input style={{width: '40%'}} placeholder="Description" type="text" className="form-control" value={this.state.description} onChange={this.handleDescriptionChange}/>
            <input style={{width: '20%'}} placeholder="Effort" type="number" className="form-control" value={this.state.effort} onChange={this.handleEffortChange}/>
            <input style={{width: '20%'}} placeholder="Priority" type="number" className="form-control" value={this.state.priority} onChange={this.handlePriorityChange}/>
              <div className="input-group-btn">
              <button onClick={this.handleSubmit} className="btn btn-primary btn-block btn-flat">Add</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default addUserStoryForm;
