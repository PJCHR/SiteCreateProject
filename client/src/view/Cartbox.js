import React, { Component } from 'react';

import HomeStyle from '../css/HomeStyle.module.css';
import M from '../css/CartboxStyle.module.css';

import { TOP, BOTTOM } from './Home';
import axios from 'axios';

class Cartbox extends Component {
	state = {
        authority: '',
        result: [],
        status:''   
    }

    componentDidMount() {
        this.cartApi();
        this.reLoginCheck();

    }

    cartApi = async () => {
      await axios.get('/authority',this.state)
		  .then(res => this.setState({ authority: res.data }));
      await axios.post('/mycart',this.state)
      .then(res => {this.setState({ result: res.data });})
      .then(this.onVisible);
    }

    reLoginCheck = () => {
      axios.get('/authority', this.state)
      .then(res => { this.setState({status:res.data.status, authority:res.data}); });
    }

    buyAction = async () => {
        await this.reLoginCheck();
        
        if (this.state.status!=='login') {
            alert('유효시간이 지났습니다. 재 로그인 후 이용바랍니다.')
            document.location.href = "/login?ReturnUrl=Mycart";
        }
        else {
            alert('결제되었습니다.')
        }
    }

    loginAction = () => {
        document.location.href = "/login?ReturnUrl=" + document.location.href;
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }

    deleteAction = (data) => {
       var json = {num:data}
       var result = window.confirm("해당 물품을 장바구니에서 삭제하겠습니까?");
       if(result){
        axios.post("/mycartDelete", json)
        .then(res => res)
        .then(setTimeout(()=>document.location.href = document.location.href, 1000))
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
            <div className={M.cart_border}>
              {
              this.state.authority.length === 0 ?
                <div>
                  <div className={M.login_fail}> 로그인 후 이용 부탁드립니다. </div>
                  <button className={M.login_button} onClick={this.loginAction}> 로그인</button>
                </div>
                : this.state.result.length >= 1 ? 

                this.state.result.map((item, index) => {
                  priceSum += item.pdt_price*item.much;
                  return (
                    <div className={M.item_wrap} key={index}>
                    <img className={M.item_image} src={item.imgsource} alt="이미지" /> 
                    <div className={M.item_product}>{item.pdt_name}</div>
                    <div className={M.item_much}>수량 : {item.much}개</div>
                    <div className={M.item_pay}>{this.comma(item.pdt_price*item.much)} </div>
                    <button className={M.item_delete} onClick={()=>this.deleteAction(item.num)}>삭제</button>
                    </div>
                  )
                }) :
                <div className={M.login_fail}> 아직 바구니에 담긴 물건이 없습니다. </div> 
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