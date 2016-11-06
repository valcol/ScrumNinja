import React, { Component } from 'react';
import SpecificationsBox from '../../components/Specifications';


class Specifications extends Component {

  render() {
    return (
      <SpecificationsBox {...this.props}/>
      );
    }
  }

export default Specifications;
