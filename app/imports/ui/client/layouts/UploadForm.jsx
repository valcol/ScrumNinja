import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../api/collections.js';
import  { UserRow }  from './UserRow.jsx';

class UploadForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){

    let self = this;

    if (event.currentTarget.files && event.currentTarget.files[0]) {
      let upload = Collections.CDC.insert({
        file: event.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        self.setState({
          uploading: upload,
          inProgress: true
        });
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          Session.set('error', 'Error during upload: ' + error);
        } else {
          Session.set('success', 'File "' + fileObj.name + '" successfully uploaded');
        }
        self.setState({
         uploading: [],
         progress: 0,
         inProgress: false
       });
      });

      upload.on('progress', function (progress, fileObj) {
          self.setState({
            progress: progress
          });
        });

      upload.start();
    }
  }

  isAdmin(){
    return true;
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <p>Upload New File:</p>
          <input type="file" id="fileinput" disabled={this.state.inProgress} ref="fileinput"
               onChange={this.handleChange}/>
           { this.props.error ?
           <div className="callout callout-danger">
               {this.props.error}
           </div>
           : this.props.success ?
           <div className="callout callout-success">
               {this.props.success}
           </div>
           :
           <div></div>
           }
           { this.state.inProgress ?
             <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={this.state.progress} aria-valuemin={0} aria-valuemax={100} style={{width: this.state.progress+'%'}}>
                  {this.state.progress}%
                </div>
              </div>
           :
           <div></div>
           }
        </div>
      </div>
      );
    }
}

export default createContainer((props) => {
  return {
    error: Session.get('error'),
    success: Session.get('success')
  };
}, UploadForm);
