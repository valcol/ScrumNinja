import React, { Component } from 'react';

export class ContentWrapper extends Component {

  render() {
    return (

      <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard" /> Level</a></li>
              <li className="active">Here</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Your Page Content Here */}
            {this.props.children}
          </section>
          {/* /.content */}
        </div>

    );
  }

}
