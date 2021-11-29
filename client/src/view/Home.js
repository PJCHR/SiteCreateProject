import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HeaderStyle from '../css/HeaderStyle.module.css';
import MenuStyle from '../css/MenuStyle.module.css';
import HomeStyle from '../css/HomeStyle.module.css';
import ContentsStyle from '../css/ContentsStyle.module.css';
import axios from 'axios';

class Home extends Component {
  state = {
    keyword: '',
    products: [],
  };

  componentDidMount() {
    this.onCall();
  }
  
  onCall = () => {
    axios.get('home')
    .then(res => this.setState({ products: res.data }))
    .catch(err => console.log(err));
  };

  comma = (price) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    price = price + ""

    return price.toString().replace(regexp, ',') + "원";
  }

  itempage = (item) =>{
    document.location.href = "/itempage?item="+item;
  }

  render() {
    const { products } = this.state;
    return (
    <div className={HomeStyle.body_wrap}>
      <TOP ReturnUrl={document.location.href}/>
      <div id="content">
        <div className={ContentsStyle.content_wrap}>
          <ul className={ContentsStyle.goods_trap}>
            {products.map((item,number) => {
              return (
                <li key={number}>
                  <div className={ContentsStyle.goods}>
                    <Link onClick={()=>this.itempage(number+1)}><img className={ContentsStyle.goods_img} src={item.imgsource} alt="goods" /></Link>
                    <div className={ContentsStyle.goods_info}> <p className={ContentsStyle.goods_info_text}> {item.pdt_name} </p> </div>
                    <div className={ContentsStyle.space}>
                      <div className={ContentsStyle.space1}> <h1 className={ContentsStyle.free_post_img}/> </div>
                      <div className={ContentsStyle.space2}> <p className={ContentsStyle.price_text}> {this.comma(item.pdt_price)} </p> </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <BOTTOM/>
    </div>
    );
  }
}

export class TOP extends Component {

  state = {
    keyword: '',
    authority: [],
  };
  componentDidMount() {
    this.checkAuthority();
  }

  comma = (price) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    price = price + ""

    return price.toString().replace(regexp, ',') + "원";
  }
  enterCheck = (event) => {
    if (event.keyCode === 13) {
       document.location.href="/item/search?name="+this.state.keyword;
    }
  }
  
  logoutApi = () =>{
    axios.delete('/logout');
    
    document.location.href= this.props.ReturnUrl;
  }
  
  latelogoutApi = async () =>{
    if(this.authority.status === 'logout'){

      alert("로그아웃됨.");
      this.logoutApi();
    }
  }
  // checklogin = (menu) => {
  //   if (this.state.authority.id) {
  //       if (menu === "2") {
  //           document.location.href = "/Account";
  //       }
  //   }
  //   else {
  //       alert('로그인 후 이용 가능합니다.');
  //       document.location.href = "/login?ReturnUrl="+this.props.ReturnUrl;
  //   }
  // }

  checkAuthority = () => {
    axios.get('/authority')
    .then(res=> {this.setState({authority: res.data});})
  }

  render() {
    const { authority } = this.state;
    return (
      <div id="gnb">
        
        <a href="javascript:window.scrollTo(0,0);"><h3 className={HomeStyle.right_top}></h3></a>
        

        <div id="header" className={HeaderStyle.header}>
          <div className={HeaderStyle.inner}>
          {/* <div className={HeaderStyle.c_gnb_button_category}><button type="button" aria-haspopup="dialog" aria-controls="gnbCategory" data-log-actionid-area="header_menu" data-log-actionid-label="sidemenu">카테고리 전체보기</button></div> */}
            <input type="checkbox" id="sidebar" />
            <div className={HeaderStyle.side_btn_wrap}>
              {/* <button type="button" className={HeaderStyle.lside_btn} label="sidebar"> */}
                <label for="sidebar" className={HeaderStyle.lside_btn}></label>
              {/* </button> */}
            </div>
            {/* <div className={HeaderStyle.category_btn}>
              <h3></h3>
              <h1>메뉴</h1>
              <div className={HeaderStyle.category_layer}>

              </div>
            </div> */}

            
            
            <h1 className={HeaderStyle.logo}>  <Link to='/'>home</Link> </h1>

            <span className={HeaderStyle.search}>
              <input className={HeaderStyle.input_text} id="keyword" type="text" onKeyUp={this.enterCheck} onChange={e => this.setState({ keyword: e.target.value })} autocomplete="off"/>
              <Link className={HeaderStyle.sch_smit} id="link" to={'/item/search?name=' + this.state.keyword} />
            </span>
            
            <div className={HeaderStyle.img_menu}>
              <ul className={HeaderStyle.menu}>
                <li className={HeaderStyle.my}> {authority.status==="login"?<Link className={HeaderStyle.mymenu}/>:<Link to={"/login?ReturnUrl="+this.props.ReturnUrl} className={HeaderStyle.mymenu}/>}
                  <ul className={HeaderStyle.menu_sub}>
                    <li> <Link >주문/배송조회</Link> </li>
                    <li> <Link >취소/반품/교환</Link> </li>
                    <li> {authority.status==="login"?<Link to="pwcheck">회원정보</Link>:<Link to={"/login?ReturnUrl="+this.props.ReturnUrl}>회원정보</Link>} </li>
                  </ul>
                </li>
              
                <li className={HeaderStyle.cart}><Link to="/cartbox" className={HeaderStyle.mycart}></Link></li>
              </ul>
            </div>
            
            <div className={HeaderStyle.sidebar} id="gnbCategory" role="dialog" aria-modal="true" aria-hidden="false" aria-labelledby="gnbCategoryTitle">
              <div>
                {/* inner */}
                <div className={HeaderStyle.menulayer}>
                  <h2 id="gnbCategoryTitle" className={HeaderStyle.skip}>사용자정보/카테고리/주요서비스</h2>
                  <div className={HeaderStyle.categoryUser_info}>
                    <div className={HeaderStyle.user}>
                      {authority.status==="login"?<Link className={HeaderStyle.login} to="">【 {authority.name} 님】</Link> : <Link className={HeaderStyle.login} to={"/login?ReturnUrl="+this.props.ReturnUrl}>로그인</Link>}
                    </div>
                  </div>
                  <div className={HeaderStyle.category_group}>
                    <div className={HeaderStyle.category_title}>
                      <h3 className={HeaderStyle.title}>카테고리</h3>
                    </div>
                    <nav className={HeaderStyle.category_list}>
                      <ul>
                        <li className={HeaderStyle.category_list_li}>
                          <a>생선류</a>
                          <div className={HeaderStyle.category_sub_group}>
                            <nav className={HeaderStyle.category_sub_list}>
                              <ul> 
                                <li><a value="1"></a></li>
                                <li><a value="2"></a></li>
                                <li><a value="3"></a></li>
                                <li><a value="4"></a></li>
                              </ul>
                            </nav>
                          </div>
                        </li>
                        <li className={HeaderStyle.category_list_li}>
                          <a>갑각류</a>
                        </li>
                        <li className={HeaderStyle.category_list_li}>
                          <a>조개류</a>
                        </li>
                        <li className={HeaderStyle.category_list_li}>
                          <a>극피류</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className={HeaderStyle.c_category_banner}>
                  <span className={HeaderStyle.skip}>광고배너</span>
                  <a>
                    {/* <img class="" src="//cdn.011st.com/11dims/resize/300x94/quality/75/11src/browsing/banner/2020/09/24/17770/2020092417512426755_11039491_1.jpg" alt="SKpay머니"> */}
                  </a>
                </div>

                {/* <button type="button" className={HeaderStyle.side_close} data-log-actionid-area="sidemenu" data-log-actionid-label="close">카테고리 메뉴닫기 */}
                <label for="sidebar" className={HeaderStyle.side_close}></label>  
                {/* </button> */}

              </div>
              
            </div>
            <label for="sidebar" className={HeaderStyle.sidebar_backgorund}></label>
          </div>
        
      
          <div className={MenuStyle.menu_wrap}>
            <div className={MenuStyle.inner}>

              {/* <ul className={MenuStyle.menu}>
                <li>
                  <a href="/">메뉴1</a>
                  <ul className={MenuStyle.menu_sub}>
                    <li> <a href="/">메뉴 1_1</a> </li>
                    <li> <a href="/">메뉴 1_1</a> </li>
                    <li> <a href="/">메뉴 1_1</a> </li>
                  </ul>
                </li>
                <li> <a href="/">메뉴2</a>
                  <ul className={MenuStyle.menu_sub}>
                    <li> <a href="/">메뉴 2_1</a> </li>
                    <li> <a href="/">메뉴 2_1</a> </li>
                    <li> <a href="/">메뉴 2_1</a> </li>
                  </ul>
                </li>
                <li> <a href="/">메뉴3</a>
                  <ul className={MenuStyle.menu_sub}>
                    <li> <a href="/">메뉴 3_1</a> </li>
                    <li> <a href="/">메뉴 3_1</a> </li>
                    <li> <a href="/">메뉴 3_1</a> </li>
                  </ul>
                </li>
                <li> <a href="/">메뉴4</a>
                  <ul className={MenuStyle.menu_sub}>
                    <li> <a href="/">메뉴 4_1</a> </li>
                    <li> <a href="/">메뉴 4_1</a> </li>
                    <li> <a href="/">메뉴 4_1</a> </li>
                  </ul>
                </li>
              </ul> */}

              <div className={MenuStyle.top_menu}>
                <span className={MenuStyle.profile_display}>{authority.status==="login"?<Link to=""><strong className={MenuStyle.profile_display}>【 {authority.name} 님 】</strong></Link>:''}</span>
                <span className={MenuStyle.text_link}>
                  {authority.status==="login"?<Link onClick={this.logoutApi}>로그아웃</Link>:<Link to={"/login?ReturnUrl="+this.props.ReturnUrl}>로그인</Link>}
                  <Link to='/register'> 회원가입 </Link>
                  <Link to='/cscenter=board_list?page=1'> 고객센터 </Link>
                </span>
              </div>

            </div>
          </div>
        </div>
    </div>
    );
  }
}

export class BOTTOM extends Component {
    render() {
        return (
        <div id="footer">
          <div className={HomeStyle.footer_wrap}>
            <div className={HomeStyle.liner}>
              <p>NAME - ParkJicheonhoryeong</p>
              <p>ADRESS - NULL</p>
              <p>H.P - NULL</p>
            </div>
            
            <div className={HomeStyle.remark}>
              <p>강화도지역마켓</p>
              <p>GANGHWAFISHMARKET.COM</p>
            </div>
          </div>
        </div>
        );
    }
}

export default Home;
