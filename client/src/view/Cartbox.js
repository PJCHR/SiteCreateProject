import React, { Component } from 'react';
import $, { nodeName } from "jquery"
import axios from 'axios';

import HomeStyle from '../css/HomeStyle.module.css';
import M from '../css/CartboxStyle.module.css';

import { TOP, BOTTOM } from './Home';


class Cartbox extends Component {
	state = {
    authority: '',
    result: [],
    status:'',
    count: 0,
  }

  componentDidMount() {
    this.cartApi();
  }

  cartApi = async () => {
    await axios.get('/authority')
    .then(res => this.setState({ authority: res.data }));
    await axios.post('/mycart',this.state)
    .then(res => {this.setState({ result: res.data });})
  }

  buyAction = async () => {
    // 로그인 상태 체크
    await axios.get('/authority', this.state)
    .then(res => { this.setState({status:res.data.status, authority:res.data}); });
    
    if (this.state.status!=='login') {
      alert('유효시간이 지났습니다. 재 로그인 후 이용바랍니다.')
      document.location.href = "/login?ReturnUrl=Mycart";
    }
    else {
      alert('결제되었습니다.');
      document.location.href = '/';
    }
  }

  loginAction = () => {
      document.location.href = "/login?ReturnUrl=" + document.location.href;
  }

  all_Checkbox = () => {
    var cnt = $('input:checkbox[name=ChkboxSelt]').length;
    if(document.getElementById("all_Checkbox").checked===true){  //id 를 사용하여 하나의 객체만을 호출
      for(var i=0;i<cnt;i++) document.getElementsByName("ChkboxSelt")[i].checked=true;   //name 을 사용하여 배열 형태로 담아 호출
      
      if(cnt > 0){
        document.getElementById('checkPrdCnt').innerText = '('+cnt+')';
      }
    }
    
    if(document.getElementById("all_Checkbox").checked===false){
      for(var i=0;i<cnt;i++) document.getElementsByName("ChkboxSelt")[i].checked=false;  
      document.getElementById('checkPrdCnt').innerText = '';
    }
  }

  checkConfirm = async (data) => {
    // const val_Data = [];
    const val_Data = $('input:checkbox[name=ChkboxSelt]').val();
    console.log(data);

    var cnt = $('input:checkbox[name=ChkboxSelt]').length;
    var Chk_cnt = $('input:checkbox[name=ChkboxSelt]:checked').length;
    
    this.setState(await{count: Chk_cnt});

    // 출력
    if(this.state.count === cnt){document.getElementById("all_Checkbox").checked=true;}
    if(this.state.count !== cnt){document.getElementById("all_Checkbox").checked=false;}
    
    if(Chk_cnt <= 0){
      document.getElementById('checkPrdCnt').innerText = '';
    }
    else(document.getElementById('checkPrdCnt').innerText = '('+Chk_cnt+')');
    
    return Chk_cnt;
  }

  all_deleteAction = async (data) => {
    var cnt = $('input:checkbox[name=ChkboxSelt]').val();

    for(var i=0;i<data.length;i++){
    }
    
    // console.log(this.state.idx);
    
    if(this.state.count !== 0){
      if(window.confirm("해당 물품을 장바구니에서 삭제하겠습니까?")){
        // axios.post("/mycartDelete", this.state)
        // .then(res => res)
        // .then(setTimeout(() => document.location.href = document.location.href, 1000))
      }
    }
    if(this.state.count === 0){
      alert('삭제할 상품을 선택해주십시오.');
    }
  }

  deleteAction = async (data) => {
    this.setState(await{idx: data});
    if(window.confirm("해당 물품을 장바구니에서 삭제하겠습니까?")){
      axios.post("/mycartDelete", this.state)
      .then(res => res)
      .then(setTimeout(() => document.location.href = document.location.href, 1000))
    }
  }

  comma = (price) => {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      price = price + ""

      return price.toString().replace(regexp, ',') + "원";
  }

  render() {
	  var priceSum = 0;
    const { result, count } = this.state;
    return (
      <div className={HomeStyle.body_wrap}>
        <TOP ReturnUrl={document.location.href}/>
        <div id="content">
          <div className={M.content_wrap}>
            <div className={M.cart_wrap}>

              <div className={M.order_header}>
                <div className={M.order_header_inner}>

                    <div className={M.order_title}>
                        <h1>장바구니</h1>
                    </div>

                    <div className={M.order_step}>
                        <ul className={M.step}>
                            <li><i className={M.number}>01</i> 장바구니</li>
                            <li className={M.second}><i className={M.number}>02</i> 주문결제<span className={M.skip}>현재 단계</span></li>
                            <li><i className={M.number}>03</i> 주문완료</li>
                        </ul>
                    </div>

                </div>
              </div>

              <div className={M.cart_border}>

                <div className={M.b_order_cart_top}>
                  <span className={M.all_check}>
                    <label className={M.c_order_checkbox}>
                      <input type="checkbox" name="ALL" id="all_Checkbox" onChange={this.all_Checkbox} title="장바구니 전체 상품 선택"/>
                      <span>전체선택 
                        <span id="checkPrdCnt"/>
                      </span>
                    </label>
                  </span>
                  <button onClick={e => this.all_deleteAction(result)} >선택삭제</button>
                </div>

                {this.state.authority.length === 0 ? 
                  <div>
                    <div className={M.login_fail}> 로그인 후 이용 부탁드립니다. </div>
                    <button className={M.login_button} onClick={this.loginAction}> 로그인</button>
                  </div>
                  : 
                  this.state.result.length >= 1 ? 

                  
                  
                  <div className={M.item_listForm}>
                  {this.state.result.map((item, index) => {
                    // 체크된 물품에 따라서 모두 합
                    priceSum += item.pdt_price * item.count;
                    
                    return (
                      <div className={M.item} key={index}>
                        
                        <div className={M.c_order_store}>
                          <div className={M.store_name}>
                            <h4>
                              <a>강화도지역마켓</a>
                            </h4>
                          </div>
                            <label className={M.c_order_checkbox_part}>
                              <input type="checkbox" name="ChkboxSelt" id={`checkSelt-${index}`} value={index} onChange={e => this.checkConfirm(item.idx)} title="스토어선택"/>
                              <span>store name</span>
                            </label>
                          </div>
                          <div className={M.item_info}>
                            <img className={M.item_image} src={item.imgsource} alt="이미지" /> 
                            <div className={M.item_product}>{item.pdt_name}</div>
                            <div className={M.item_much}>수량 : {item.count}개</div>
                            <div className={M.item_pay}>{this.comma(item.pdt_price * item.count)} </div>
                            <button className={M.item_delete} onClick={e => this.deleteAction(item.idx)}>삭제</button>
                          </div>
                      </div>
                    )
                  })}
                  </div>
                  : 
                  <div className={M.login_fail}> 장바구니에 담긴 물건이 없습니다. </div> 
                }
              </div>

              <div className={M.buy_wrap}>
                <div className={M.buy_text}> 결제 예정금액 </div>
                <div className={M.buy_sum}>총 {this.comma(priceSum)}</div>
                <button className={M.buy_button} onClick={this.buyAction}>결제하기</button>
              </div>
            </div>
          </div>
        </div>
        <BOTTOM/>
      </div>
      );
  }
}

export default Cartbox;