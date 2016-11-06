import React, { Component } from 'react';
import CreationForm from './CreationForm.js';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';


class CreateProject extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Project details
        </BoxHeader>
        <BoxBody>
          <CreationForm/>
        </BoxBody>
      </Box>
    );
  }
}

export default CreateProject;
