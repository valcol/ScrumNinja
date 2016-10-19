import React, { Component } from 'react';

import { Header } from '../layouts/Header.jsx';
import { Footer } from '../layouts/Footer.jsx';
import { Menu } from '../layouts/Menu.jsx';


export class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Menu projectName={this.props.params.projectName} />
        { this.props.children }
        <Footer/>
      </div>
    );
  }

}
