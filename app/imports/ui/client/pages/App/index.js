import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';
import { browserHistory } from 'react-router';

import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Menu from '../../layouts/Menu';
import ContentWrapper from '../../layouts/ContentWrapper';
import Sidebar from '../../layouts/Sidebar';

class App extends Component {

  render() {

    if (!this.props.currentProject && this.props.params.projectName)
      browserHistory.push('/404');

    return (
      <div>
        <Header/>
        <Menu projectName={this.props.params.projectName} />
        <ContentWrapper
          routes={this.props.routes}
          params={this.props.params}
          >
          {React.cloneElement(this.props.children, { currentProject: this.props.currentProject })}
        </ContentWrapper>
        <Sidebar/>
        <div className="control-sidebar-bg"></div>
        <Footer/>
      </div>
    );
  }
}

export default createContainer((props) => {
  const currentProject = Collections.Projects.findOne({name:props.params.projectName});
  return {
    currentProject
  };
}, App);
