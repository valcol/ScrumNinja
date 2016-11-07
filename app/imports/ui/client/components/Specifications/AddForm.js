import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Collections } from '../../../../api/common/collections.js';

class addForm extends Component {

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
      let upload = Collections.Specifications.insert({
        file: event.currentTarget.files[0],
        meta: {
          projectName: this.props.currentProject.name,
          uploadDate: new Date()
        },
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
          Session.set('success', null);
        } else {
          Session.set('success', 'File "' + fileObj.name + '" successfully uploaded');
          Session.set('error', null);
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

  render() {
    return (
      <div className="row">
      <div className="col-md-12">
      <label className="btn btn-default btn-file">
       Upload a file <input type="file" style={{display: 'none'}} disabled={this.state.inProgress} onChange={this.handleChange}/>
      </label>
      <p className="help-block">File must be in PDF. Maximum upload size : 10Mo.</p>
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

export default addForm;
