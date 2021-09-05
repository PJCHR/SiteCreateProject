import React, { Component, Link } from 'react';
import axios from 'axios';
import queryString from "query-string";

import { TOP, BOTTOM } from './Home';

import HomeStyle from '../css/HomeStyle.module.css';
import HeaderStyle from '../css/HeaderStyle.module.css';
import OrderAtionStyle from '../css/OrderAtionStyle.css';

class OrderAtion extends Component {
    state = {

    }
    componentDidMount() {

    }

    getQueryString = () => {
        const result = queryString.parse(this.props.location.search);
        const rst = result.num;
        const rst2 = result.count;

        return rst, rst2;
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }

    render(){
        return(
            <div className={HomeStyle.body_wrap} ReturnUrl={document.location.href}>
                <div id="gnb">
                    <div className={OrderAtionStyle.header_wrap}>
                        <div className={OrderAtionStyle.inner_wrap}>
                            <h1 className={HeaderStyle.logo}>  <Link to='/'>home</Link> </h1>
                        </div>
                    </div>
                </div>
                <div id="content">
                    <div className={OrderAtionStyle.content_wrap}>
                        
                    </div>
                </div>
                <BOTTOM/>
            </div>
        );
    }
}

export default OrderAtion;