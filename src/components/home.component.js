import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import drupalImage from '../assets/images/drupal.png';
import reactImage from '../assets/images/react.png';
class Home extends Component {
    render() {
        const column = {
            float: 'left',
            width: '48.33%',
            padding: '5px'
        };
        const row = {
            content: "",
            clear: 'both',
            display: 'table'
        };
        const width = {
            width: '100%'
        }
       return (
        
        <div style={ row }>
            <div style={ column } >
                <img src={drupalImage} alt={"logo"} style={ width }/> 
            </div>
            <div style={ column }>
                    <img src={reactImage} alt={"logo"} style={ width }/> 
            </div>
        </div>
        
      );
    }
  }
  export default Home;