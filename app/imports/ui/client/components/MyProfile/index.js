import React, { Component } from 'react';
import EditForm from './EditForm.js';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';


class MyProfile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Edit my informations
        </BoxHeader>
        <BoxBody>
          <EditForm/>
        </BoxBody>
      </Box>
    );
  }
}

export default MyProfile;
