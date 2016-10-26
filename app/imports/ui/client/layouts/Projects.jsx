import React from 'react';
import { Link } from 'react-router';

export const Projects = () =>
    <div className="projects-list">
    <h3>Projects</h3>
    <li><Link to="/p/project1/" className="project" activeStyle={{ color: 'red' }}>project#1</Link></li>
    <li><Link to="/p/project2/" className="project" activeStyle={{ color: 'red' }}>project#2</Link></li>
    </div>;
