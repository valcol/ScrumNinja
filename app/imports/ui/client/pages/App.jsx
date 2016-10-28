import React, { Component } from 'react';

import { Header } from '../layouts/Header.jsx';
import { Footer } from '../layouts/Footer.jsx';
import { Menu } from '../layouts/Menu.jsx';
import { ContentWrapper } from '../layouts/ContentWrapper.jsx';
import { Sidebar } from '../layouts/Sidebar.jsx';


export class App extends Component {

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
