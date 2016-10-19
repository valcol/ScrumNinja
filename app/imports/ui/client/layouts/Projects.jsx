import React from 'react';
import { Link } from 'react-router';

export const Projects = () =>
    <span>
    <h3>Projects</h3>
    <li><Link to="/p/project1/" activeStyle={{ color: 'red' }}>project#1</Link></li>
    <li><Link to="/p/project2/" activeStyle={{ color: 'red' }}>project#2</Link></li>
    </span>;
