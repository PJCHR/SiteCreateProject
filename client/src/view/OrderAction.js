import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from "query-string";
import $ from "jquery"

import { BOTTOM } from './Home';

import HomeStyle from '../css/HomeStyle.module.css';
import OrderActionStyle from '../css/OrderActionStyle.module.css';

class OrderAction extends Component {
    state = {
        userData: [],
    }
    componentDidMount() {
        this.getQueryString();
        this.checkRadio();
        this.userAddr();
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

    

    checkRadio = () => {
        // $(document).ready(function(){
        //     $("#radioCheck").click(function(event){
        //         event.preventDefault();
        //     });
        // });
        var v = document.querySelector('input[name="radioCheck"]:checked').value;
        // console.log(v);
        
        if(v === 'basic'){
            document.getElementById('addr1').style.display = "block"; // 기본배송지
        }else{
            document.getElementById('addr1').style.display = "none"; // 숨김
        }
        if(v === 'self'){
            document.getElementById('addr2').style.display = "block"; // 직접입력
        }else{
            document.getElementById('addr2').style.display = "none"; // 숨김
        }

        // var cellPhone = document.getElementById('cellPhone');
        // cellPhone.onkeyup = function(event){
        // event = event || window.event;
        // var _val = this.value.trim();
        // this.value = this.autoHypenPhone(_val) ;
        // }
    }
    
    userAddr = async () => {
        await axios.get('/authority',this.state)
        .then(res => this.setState({ authority: res.data }))
        await axios.post('/orderaction',this.state)
        .then(res => this.setState({ userData: res.data }))
        .catch(err => console.log(err));

        
    }

    render(){
        const { userData } = this.state;
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
                                                    {/* 기본 배송지 */}
                                                    <li>
                                                        {/* <label><input type="radio" name="radiobox" value="rdo1">rdo1</input></label> */}
                                                        <label><input type="radio" name="radioCheck" id="r1" value="basic" onClick={this.checkRadio} checked/><span>기본배송지</span></label>
                                                    </li>
                                                    {/* 직접 입력 */}
                                                    <li>
                                                        <label><input type="radio" name="radioCheck" id="r2" value="self" onClick={this.checkRadio} /><span>직접입력</span></label>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            {/* 배송지 라디오 체크에 따라 레이아웃 바뀜 */}
                                            {/* 기본배송지 */}
                                            <div className={OrderActionStyle.c_order_delivery} id="addr1" style={{display:"none"}}>
                                                <h3 className={OrderActionStyle.skip}>기본배송지</h3>
                                                {userData.map((item,number) => {
                                                return(
                                                <div className={OrderActionStyle.c_order_delivery_info}>
                                                    <div className={OrderActionStyle.c_order_address}>
                                                        <dl>
                                                            {/* 받는 사람 */}
                                                            <div className={OrderActionStyle.name}>
                                                                <dt className={OrderActionStyle.skip}>받으시는 분</dt>
                                                                <dd>
                                                                    <span id="dlv_view_01_html">{item.nickname}</span>
                                                                </dd>
                                                            </div>
                                                            {/* 주소 */}
                                                            <div className={OrderActionStyle.address}>
                                                                <dt className={OrderActionStyle.skip}>주소</dt>
                                                                <dd>
                                                                    <div className={OrderActionStyle.form_box}>
                                                                        <span id="dlv_view_02_html">{item.addr}</span>
                                                                    </div>
                                                                </dd>
                                                            </div>
                                                            {/* 휴대전화 */}
                                                            <div id="dlv_03_view">
                                                                <div className={OrderActionStyle.phone_number}>
                                                                    <dt className={OrderActionStyle.skip}>휴대전화</dt>
                                                                    <dd><span id="dlv_view_03_html">{item.phone}</span></dd>
                                                                </div>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                                )})}
                                            </div>

                                            {/* 직접입력 */}
                                            <div className={OrderActionStyle.c_order_delivery} id="addr2" style={{display:"none"}}>직접입력
                                                <div className={OrderActionStyle.c_order_delivery_info}>
                                                    
                                                </div>
                                            </div>
                                            
                                            {/* 요청사항 선택 */}
                                            <div className={OrderActionStyle.c_order_delivery_request}></div>
                                        </div>
                                    </div>

                                    <div className={OrderActionStyle.order_goods}>
                                        구매 상품 게시
                                    </div>
                                </div>
                                <div className={OrderActionStyle.order_payment}>
                                    <h3 className={OrderActionStyle.skip}>주문/결제 정보</h3>
                                    <div className={OrderActionStyle.payment_wrap}>
                                        결제 정보창
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