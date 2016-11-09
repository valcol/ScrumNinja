import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

/*
TODO
  Comment on gère l'ID ?
    on le créer nous meme ? (gérer quand ils en suppriment)
    Ils le nomment ? (on doit empecher les doublons)
    actuellement seconde version car plus simple sans gestion.
*/

class addUserStoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      description: '',
      effort: 0,
      priority: 0
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
    Meteor.call('userstories.add', this.state.id, this.state.description, this.state.effort, this.state.priority, this.props.currentProject.name, function(err, res) {
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
            <input type="text" className="form-control" placeholder="Id" value={this.state.id} onChange={this.handleIdChange}/>
            <input type="text" className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange}/>
            <input type="number" className="form-control" placeholder="Effort" value={this.state.effort} onChange={this.handleEffortChange}/>
            <input type="number" className="form-control" placeholder="Priority" value={this.state.priority} onChange={this.handlePriorityChange}/>
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
