import React, { Component } from 'react';

class Sidebar extends Component {

  render() {
    return (
      <aside className="control-sidebar control-sidebar-dark">
        {/* Create the tabs */}
        <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
          <li className="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home" /></a></li>
          <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears" /></a></li>
        </ul>
        {/* Tab panes */}
        <div className="tab-content">
          {/* Home tab content */}
          <div className="tab-pane active" id="control-sidebar-home-tab">
            <h3 className="control-sidebar-heading">Something1</h3>
          </div>
          {/* /.tab-pane */}
          {/* Stats tab content */}
          <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
          {/* /.tab-pane */}
          {/* Settings tab content */}
          <div className="tab-pane" id="control-sidebar-settings-tab">
            <h3 className="control-sidebar-heading">Something2</h3>
          </div>
          {/* /.tab-pane */}
        </div>
      </aside>
    );
  }

}

export default Sidebar;
