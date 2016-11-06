import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../api/collections.js';

import Header from '../layouts/Header.jsx';
import { Footer } from '../layouts/Footer.jsx';
import { Menu } from '../layouts/Menu.jsx';
import { ContentWrapper } from '../layouts/ContentWrapper.jsx';
import { Sidebar } from '../layouts/Sidebar.jsx';


class App extends Component {

  getChildContext() {
    return { currentProject: this.props.currentProject };
  }

  render() {

    return (
      <div>
        <Header/>
        <Menu projectName={this.props.params.projectName} />
        <ContentWrapper
          routes={this.props.routes}
          params={this.props.params}
          >
          {this.props.children}
        </ContentWrapper>
        <Sidebar/>
        <div className="control-sidebar-bg"></div>
        <Footer/>
      </div>
    );
  }
}

App.childContextTypes = {
  currentProject: React.PropTypes.Object
};

export default createContainer((props) => {
  const currentProject = Collections.Projects.findOne({name:props.params.projectName});
  return {
    currentProject
  };
}, App);
