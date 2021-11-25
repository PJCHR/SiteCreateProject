import React, { Component} from 'react';
import I from '../css/Item.module.css';
import HomeStyle from '../css/HomeStyle.module.css';

import { TOP, BOTTOM } from './Home';
import queryString from "query-string";
import axios from 'axios';

class Item extends Component {
    state = {
        result: [],
        authority: [],
        count: 1
    }
    componentDidMount() {
        this.searchResult();
        this.checkAuthority();
    }

    searchResult = () => {
        var query = this.getQueryString();
        axios.get(`/itemApi?item=${query}`)
        .then(response => {this.setState({ result: response.data });})
        .catch(err => console.log(err));
    }

    getQueryString = () => {
        const result = queryString.parse(this.props.location.search);
        const rst = result.item;

        return rst;
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }

    increase = () => {
        this.setState({ count: this.state.count + 1 })
    }

    decrease = () => {
        if (this.state.count > 1) {
            this.setState({ count: this.state.count - 1 })
        }
    }

    checkAuthority = () => {
        axios.get('/authority')
        .then(res => this.setState({ status: res.data.status, authority: res.data }))
    }
    
    orderList = (num, count) => {
        if (this.state.status === 'login') {
            document.location.href = `/orderaction?num=${num}&count=${count}`;
        }
        else {
            alert("로그인 후 이용부탁드립니다.")
            document.location.href = "/login?ReturnUrl="+ document.location.href;
        }
    }

    cartDeliver = () => {
        if (this.state.status === 'login') {
            axios.post("/cart", this.state)
            .then(res => res)
            .then(() => {
                if(window.confirm('장바구니에 담겼습니다. 확인하시겠습니까?') === true){
                    document.location.href = '/cartbox';
                }
                else{
                    return false;
                }
            })
        }
        else {
            alert("로그인 후 이용부탁드립니다.")
        }
    }
  
    render() {
    const { result, count } = this.state;
    
      return (
      <div className={HomeStyle.body_wrap}>
        <TOP ReturnUrl={document.location.href}/>
        <div id="content">
            <div className={I.page_wrap}>
                {result.map((item, index) => {
                    return (
                        <div className={I.content_wrap}>
                            <div className={I.product_wrap} key={index}>
                                <img className={I.product_image} src={item.imgsource} alt={item.pdt_name} />
                                <div className={I.product_title}>{item.pdt_name}</div>
                                <div className={I.product_rank}>실검순위 <span className={I.change}>#99</span></div>
                                <div className={I.product_price}>{this.comma(item.pdt_price)}</div>
                                <div className={I.product_tip}>실검순위, 평점, 조회수는 실시간 데이터 기반으로 측정됩니다. (현재 개발 진행중, 아직 미구현)</div>
                                <div className={I.product_tooltip}>
                                    <div className={I.product_rate}><div className={I.star_image} /> 평점 <br /> 5점/10점 </div>
                                    <div className={I.product_search}><div className={I.tag_image} />{item.click}회 <br /> 조회됨</div>
                                    <div className={I.product_delivery}><div className={I.deliver_image} /> 무료배송</div>
                                </div>
                            </div>
                            <div className={I.cart_wrap}>
                                <div className={I.select_btn_wrap}>
                                    <button className={I.btn_minus} onClick={this.decrease} />
                                    <div className={I.count}>{count}</div>
                                    <button className={I.btn_plus} onClick={this.increase} />
                                </div>
                                <div className={I.price_wrap}>
                                    <p className={I.fin_count}>총 {count}개</p>
                                    <div className={I.price_sum}>{this.comma(parseInt(item.pdt_price * count))}</div>
                                </div>
                                <div className={I.buy_btn_wrap}>
                                    <button className={I.cart_btn} onClick={this.cartDeliver}>장바구니</button>
                                    <button className={I.buy_btn} onClick={()=>this.orderList(item.num, count)}>구매하기</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <BOTTOM/>
      </div>
      );
    }
  }

export default Item;