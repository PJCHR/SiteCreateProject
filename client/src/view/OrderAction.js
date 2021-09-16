import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from "query-string";

import { TOP, BOTTOM } from './Home';

import HomeStyle from '../css/HomeStyle.module.css';
import OrderActionStyle from '../css/OrderActionStyle.module.css';

class OrderAction extends Component {
    state = {

    }
    componentDidMount() {
        this.getQueryString();
    }

    getQueryString = () => {
        const result = queryString.parse(this.props.location.search);
        const rst = result.num;
        const rst2 = result.count;

        return rst, rst2;
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + "";

        return price.toString().replace(regexp, ',') + "원";
    }

    render(){
        return(
            <div className={HomeStyle.body_wrap} ReturnUrl={document.location.href}>
                <div id="gnb">
                    <div className={OrderActionStyle.header_wrap}>
                        <div className={OrderActionStyle.inner}>
                            <h1 className={OrderActionStyle.logo}> <Link to='/'>home</Link> </h1>
                        </div>
                    </div>
                </div>
                <div id="content">
                    <div className={OrderActionStyle.order_content}>
                        <div className={OrderActionStyle.order_header}>
                            <div className={OrderActionStyle.order_header_inner}>
                                <div className={OrderActionStyle.order_title}>
                                    <h1>주문결제</h1>
                                </div>
                                <div className={OrderActionStyle.order_step}>
                                    <ul className={OrderActionStyle.step}>
                                        <li><i className={OrderActionStyle.number}>01</i> 장바구니</li>
                                        <li className={OrderActionStyle.second}><i className={OrderActionStyle.number}>02</i> 주문결제<span className={OrderActionStyle.skip}>현재 단계</span></li>
                                        <li><i className={OrderActionStyle.number}>03</i> 주문완료</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={OrderActionStyle.order_info}>
                            <div className={OrderActionStyle.shopping_adress_wrap}>

                            </div>
                            <div className={OrderActionStyle.order_product_wrap}>

                            </div>
                            <div className={OrderActionStyle.payment_info}>
                                <div className={OrderActionStyle.payment_wrap}>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <BOTTOM/>
            </div>
        );
    }
}

export default OrderAction;