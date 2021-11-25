import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from "query-string";
import phoneFomatter from "../script/phoneFomatter";
import $, { nodeName } from "jquery"

import { BOTTOM } from './Home';

import HomeStyle from '../css/HomeStyle.module.css';
import OrderActionStyle from '../css/OrderActionStyle.module.css';

class OrderAction extends Component {
    state = {
        userData: [],
        itemData: [],
    }
    componentDidMount() {
        this.getQueryString();
        this.userAddr();
        this.checkAuthority();
    }

    getQueryString = () => {
        const result = queryString.parse(this.props.location.search);
        const rst = result.num;
        const rst2 = result.count;
        this.setState({itemCount: rst2});

        return rst;
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price * this.state.itemCount + "";

        return price.toString().replace(regexp, ',');
    }

    checkRadio = () => {
        // $(document).ready(function(){

        // 체크값 확인 코드
        // var v = document.querySelector('input[name="radioCheck"]:checked').value;
        var v = $('input[name=radioCheck]:checked').val();
        // console.log(v);
        
        if(v === 'basic'){
            document.getElementById('div_view1').style.display = "none"; // 받는사람 INPUT
            // document.getElementById('div_view2').style.display = "none"; // 주소 INPUT
            // document.getElementById('div_view3').style.display = "none"; // 전화번호 INPUT

            document.getElementById('div_01').style.display = "block"; // 받는사람 TEXT
            document.getElementById('div_02').style.display = "block"; // 주소 TEXT
            document.getElementById('div_03').style.display = "block"; // 전화번호 TEXT
        }
        if(v === 'self'){
            document.getElementById('div_view1').style.display = "block"; // 받는사람 INPUT
            // document.getElementById('div_view2').style.display = "block"; // 주소 INPUT
            // document.getElementById('div_view3').style.display = "block"; // 전화번호 INPUT

            document.getElementById('div_01').style.display = "none"; // 받는사람 TEXT
            document.getElementById('div_02').style.display = "none"; // 주소 TEXT
            document.getElementById('div_03').style.display = "none"; // 전화번호 TEXT
        }
        
        // $('r2').prop('checked',true);
        // $('r1').prop('checked',false);
    }

    phoneFomatter = (num,type) => {
        // type 에 0이 포함되면 *** 으로 표시됨.
          var formatNum = '';
        
          if(num.length === 11){
              if(type === 0){
                  formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
              }else{
                  formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
              }
          }else if(num.length === 8){
              formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
          }else{
              if(num.indexOf('02') === 0){
                  if(type === 0){
                      formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
                  }else{
                      formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                  }
              }else{
                  if(type === 0){
                      formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
                  }else{
                      formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                  }
              }
          }
        
          return formatNum;
        }

    payment = () => {
        if (this.state.status === 'login') {
            alert('구매가 완료되었습니다.');
            console.log('결제가 완료되었습니다.');

            document.location.href = `/`;
        }
        else {
            alert("로그인 후 이용부탁드립니다.")
            document.location.href = "/login?ReturnUrl="+ document.location.href;
        }
    }
    
    userAddr = async () => {
        await axios.get('/authority',this.state)
        .then(res => this.setState({ authority: res.data }))
        await axios.post('/orderaction',this.state)
        .then(res => this.setState({ userData: res.data }))
        .catch(err => console.log(err));

        var query = this.getQueryString();
        this.setState({itemNo:query});
        await axios.post('/importItem',this.state)
        .then(res => {this.setState({ itemData: res.data })})
        .catch(err => console.log(err));

    }

    checkAuthority = () => {
        axios.get('/authority')
        .then(res => this.setState({ status: res.data.status, authority: res.data }))
    }

    render(){
        const { userData } = this.state;
        const { itemData } = this.state;
        return(
            <div className={HomeStyle.body_wrap} ReturnUrl={document.location.href}>
                <div id="gnb">
                    <div className={OrderActionStyle.l_header}>
                            <div className={OrderActionStyle.b_header_gnb}>
                                <div className={OrderActionStyle.inner}>
                                <h1 className={OrderActionStyle.logo}> <Link to='/'>home</Link> </h1>
                            </div>
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
                                                        <label><input type="radio" name="radioCheck" value='basic' onClick={this.checkRadio} defaultChecked/><span>기본배송지</span></label>
                                                    </li>
                                                    {/* 직접 입력 */}
                                                    <li>
                                                        <label><input type="radio" name="radioCheck" value='self' onClick={this.checkRadio} /><span>직접입력</span></label>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            {/* 배송지 라디오 체크에 따라 레이아웃 바뀜 */}
                                            {/* 기본배송지 */}
                                            <div className={OrderActionStyle.c_order_delivery}>
                                                <h3 className={OrderActionStyle.skip}>기본배송지</h3>
                                                {userData.map((item,number) => {
                                                return(
                                                <div className={OrderActionStyle.c_order_delivery_info}>
                                                    <div className={OrderActionStyle.c_order_address}>
                                                        <dl>
                                                            {/* 받는 사람 TEXT */}
                                                            <div className={OrderActionStyle.name} id="div_01" >
                                                                <dt className={OrderActionStyle.skip}>받으시는 분</dt>
                                                                <dd>
                                                                    <span>{item.nickname}</span>
                                                                </dd>
                                                            </div>
                                                            {/* 주소 TEXT */}
                                                            <div className={OrderActionStyle.address} id="div_02">
                                                                <dt className={OrderActionStyle.skip}>주소</dt>
                                                                <dd>
                                                                    <div className={OrderActionStyle.form_box}>
                                                                        <span>{item.addr}</span>
                                                                    </div>
                                                                </dd>
                                                            </div>
                                                            {/* 휴대전화 TEXT */}
                                                            <div className={OrderActionStyle.phone_number} id="div_03">
                                                                <dt className={OrderActionStyle.skip}>휴대전화</dt>
                                                                <dd><span>{this.phoneFomatter(item.phone)}</span></dd>
                                                            </div>

                                                            {/* 받는 사람 INPUT */}
                                                            <div className={OrderActionStyle.field} id="div_view1" style={{display: 'none'}}>
                                                                <dt className={OrderActionStyle.skip}><label>받으시는 분</label></dt>
                                                                <dd>
                                                                    {/* 값을 넣는 것에 따라 state에 저장 */}
                                                                    <input type="text" className={OrderActionStyle.name} maxlength="40" value="" placeholder="받는 사람" title="받는 사람"/>
                                                                </dd>
                                                            </div>
                                                            
                                                        </dl>
                                                    </div>
                                                </div>
                                                )})}
                                            </div>
                                            
                                            {/* 요청사항 선택 */}
                                            <div className={OrderActionStyle.c_order_delivery}>
                                                <h3 className={OrderActionStyle.skip}><label>배송시요구사항</label></h3>
                                                <div className={OrderActionStyle.delivery_info}>
                                                    <div className={OrderActionStyle.c_order_delivery_request}>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={OrderActionStyle.b_order_goods}>
                                        <div className={OrderActionStyle.c_order_style_2}>
                                            <h2 className={OrderActionStyle.title}>주문상품</h2>
                                            <p className={OrderActionStyle.text}>상품수량 및 옵션변경은 상품상세 또는 장바구니에서 가능합니다.</p>
                                        </div>
                                        <div className={OrderActionStyle.c_order_content}>
                                            <div className={OrderActionStyle.c_order_store_product}>

                                                <div className={OrderActionStyle.c_order_title}>
                                                    <h3 className={OrderActionStyle.title}><span className={OrderActionStyle.ico_store}>스토어명</span><span className={OrderActionStyle.store}> 강화도지역마켓 </span></h3>
                                                </div>

                                                <div className={OrderActionStyle.c_order_cart_list}>
                                                    <ul>
                                                        <li className={OrderActionStyle.group_prd}>
                                                            <ul>
                                                                <li>
                                                                    <div className={OrderActionStyle.cart_info_box}>
                                                                        {itemData.map((item,number) => {
                                                                        return(
                                                                            <div className={OrderActionStyle.c_order_prd_row}>
                                                                                
                                                                                
                                                                                <div className={OrderActionStyle.c_order_prd}>
                                                                                    <div className={OrderActionStyle.prd_name}>
                                                                                        {item.pdt_name}
                                                                                        <div className={OrderActionStyle.cart_thumb_box}>
                                                                                            <span className={OrderActionStyle.c_order_thumb}>
                                                                                                <img src={item.imgsource} alt="상품이미지"/>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className={OrderActionStyle.c_order_quantity}>
                                                                                    <span className={OrderActionStyle.number}>{this.state.itemCount}</span>개
                                                                                </div>
                                                                                
                                                                                <div className={OrderActionStyle.c_order_prd_price}>
                                                                                    <dl className={OrderActionStyle.price_box}>
                                                                                        <div className={OrderActionStyle.total_price}>
                                                                                            <dt className={OrderActionStyle.skip}>할인모음가</dt>
                                                                                            <dd><i className={OrderActionStyle.number}>{this.comma(item.pdt_price)}</i>원</dd>
                                                                                        </div>
                                                                                    </dl>
                                                                                </div>

                                                                            </div>
                                                                        )})}
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                <div className={OrderActionStyle.l_order_side}>
                                    <h3 className={OrderActionStyle.skip}>주문/결제 정보</h3>
                                    {itemData.map((item,number) => {
                                    return(
                                        <div className={OrderActionStyle.b_order_sticky} style={{left: '989.5px', top: '0px', marginTop: '0px'}}>
                                            
                                            <div className={OrderActionStyle.c_order_amount}>

                                                <div className={OrderActionStyle.c_order_style_2}>
                                                    <h4 className={OrderActionStyle.title}>결제 예정금액</h4>
                                                </div>

                                                <div className={OrderActionStyle.c_order_content}>
                                                    <dl>
                                                        <div className={OrderActionStyle.price_field}>
                                                            <dt>상품금액</dt>
                                                            <dd><em className={OrderActionStyle.number}>{this.comma(item.pdt_price)}</em>원</dd>
                                                        </div>
                                                        
                                                        <div className={OrderActionStyle.price_field}>
                                                            <dt>배송비</dt>
                                                            <dd><em className={OrderActionStyle.number}> 0</em>원</dd>
                                                            {/* <dd class="calculating" id="dlvAmountCalcIng">계산 중 <span class="calculating_ani"><span></span></span></dd> */}
                                                        </div>
                                                    </dl>
                                                    
                                                    <div className={OrderActionStyle.c_order_total_price}>
                                                        <h4 className={OrderActionStyle.txt_total}>합계</h4>
                                                        <span className={OrderActionStyle.price}>
                                                            {/* 추가로 배송비 옵션을 만든다면 계산식을 넣을 것 */}
                                                            <em className={OrderActionStyle.number} onChange={e => this.setState({item_price: item.pdt_price})}>{this.comma(item.pdt_price)}</em>원
                                                        </span>
                                                        {/* <div className={OrderActionStyle.final_price} style={{display: 'none'}}>14,900<span>원</span></div> */}
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div> 
                                            
                                            
                                            <div className={OrderActionStyle.c_order_button}>
                                                <button type="button" className={OrderActionStyle.btn_order} onClick={this.payment} value='결제하기'>
                                                    <em className={OrderActionStyle.number}>{this.comma(item.pdt_price)}</em>원 결제하기
                                                </button>
                                            </div>
                                        </div>
                                    )})}
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