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

    loginAction = () => {
      
    }

    checkConfirm = () => {
      var chk_arr = [];

     $('input[name=ChkboxSelt]:checked').each(function(){
       var chk = $(this).val();
       console.log(chk_arr.push(chk));
     })
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }

    deleteAction = async (data) => {
      this.setState(await{idx: data});
      if(window.confirm("해당 물품을 장바구니에서 삭제하겠습니까?")){
        axios.post("/mycartDelete", this.state)
        .then(res => res)
        .then(setTimeout(() => document.location.href = document.location.href, 1000))
      }

      else{
        alert('삭제를 취소하였습니다.');
      }
    }

  render() {
	var priceSum = 0;
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
                    <input type="checkbox" name="ChkboxSelt" id="bcktSeq_All_bottom" onClick title="장바구니 전체 상품 선택"/>
                    <span>전체선택 
                      <span id="checkPrdCnt"/>
                    </span>
                  </label>
                </span>
                <button onclick >선택삭제</button>
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
                  priceSum += item.pdt_price * item.count;
                  
                  return (
                    <div className={M.item} key={index}>
                      
                      <div className={M.c_order_store}>
                        <div className={M.store_name}>
                          <h4>
                            <a>십일초이스 생수</a>
                          </h4>
                        </div>
                          <label className={M.c_order_checkbox_part}>
                            <input type="checkbox" name="ChkboxSelt" id={`checkSelt-${index}`} value={`checkSelt-${index}`} onClick={this.checkConfirm} title="스토어전체선택"/>
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