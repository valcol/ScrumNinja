import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './ItemTypes.js';


class None extends Component {
  render() {

       return (
         <div style={{  height: '12rem',
           width: '12rem',
           marginRight: '1.5rem',
           marginBottom: '1.5rem',
           color: 'white',
           padding: '1rem',
           textAlign: 'center',
           fontSize: '1rem',
           lineHeight: 'normal',
           float: 'left',
            backgroundColor :'black'}}>
           'None'
         </div>
       );
  }
}

export default None;
