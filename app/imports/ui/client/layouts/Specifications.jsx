import React, { Component } from 'react';
import UploadForm from './UploadForm.jsx';

export class Specifications extends Component {

  render() {
    return (
      <UploadForm projectName = {this.props.projectName}/>
      );
    }

  }
