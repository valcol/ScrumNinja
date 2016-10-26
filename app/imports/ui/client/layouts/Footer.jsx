import React from 'react';

export const Footer = () =>
      <footer className="main-footer">
        {/* To the right */}
        <div className="pull-right hidden-xs">
          Made with <span style={{ color: 'red' }}>♥</span>
        </div>
        {/* Default to the left */}
        Copyright © 2016 <a href="#">ScrumNinja</a>. All rights reserved.
      </footer>;
