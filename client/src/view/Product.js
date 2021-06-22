import React, { Component } from 'react';
import axios from 'axios';

import { TOP, BOTTOM } from './Home';

import Table from 'react-bootstrap/Table'
import HomeStyle from '../css/HomeStyle.module.css';
import ProductStyle from '../css/ProductStyle.css';

class Product extends Component {
    render(){
        return(
            <div className={HomeStyle.body_wrap}>
                <div id="product_ctnt">

                    <div className={ProductStyle.pdt_view}> 
                        
                    </div>

                </div>
            </div>
        );
    }
}

export default Product;