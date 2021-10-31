import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from "query-string";

import { BOTTOM } from './Home';

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
                    <div className={OrderActionStyle.l_order}>
                        <div className={OrderActionStyle.s_order}>
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
                            <div className={OrderActionStyle.order_content_wrap}>
                                <div className={OrderActionStyle.l_order_content}>
                                    <div className={OrderActionStyle.order_info}>
                                        <div className={OrderActionStyle.c_order_style_3}>
                                            <h2 className={OrderActionStyle.c_order_title}>배송정보</h2>
                                            {/* <a href="#" class="c_order_btn btn_delivery_list" onclick="javascript:addrSearchWindowOpen();doCommonStat('ORAD001');return false;" id="dlvListView" data-log-actionid-label="delivery_address_list" target="_blank">배송지목록</a> */}
                                        </div>
                                        <div className={OrderActionStyle.c_order_content}>
                                            <div className={OrderActionStyle.c_order_select_delivery}>
                                                <ul>
                                                <li>
                                                    <label class="c_order_radio" for="addrArrRadio1" id="addrArrRadioLabel" data-log-actionid-label="registration_address">
                                                        <input type="radio" id="addrArrRadio1" name="addrArrRadio" parent="1" value="" rcvr_name="" phone="" mobile_phone="" mail_no="" base_addr="" desc_addr="" mail_no_seq="" jejuyn="N" islandyn="N" addrtypcd="02" buildmngno="2871037027106740000038509" lnmaddrseq="" addrseq="1" onclick="" data-log-body="{'btn_name':'기본배송지'}"/><span>기본배송지</span>
                                                    </label>
                                                </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={OrderActionStyle.order_goods}>

                                    </div>
                                </div>
                                <div className={OrderActionStyle.order_payment}>
                                    <h3 className={OrderActionStyle.skip}>주문/결제 정보</h3>
                                    <div className={OrderActionStyle.payment_wrap}>
                                        
                                    </div>
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