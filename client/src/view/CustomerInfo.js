import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeStyle from '../css/HomeStyle.module.css';
import CustomerInfoStyle from '../css/CustomerInfoStyle.module.css';

import { TOP, BOTTOM } from './Home';

class CustomerInfo extends Component {
    state = {
      id:"",
      pw: "",
      result:[],
    };
    
    
    render() {
      return (
        <div className={HomeStyle.Home_wrap}>
           <TOP/>
  
          <div className={CustomerInfoStyle.CustomerInfo_wrap}>
            
          </div>
            
          <BOTTOM/>
        </div>
      );
    }
  }
  
  export default CustomerInfo;