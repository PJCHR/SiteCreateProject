import React, { Component, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import queryString from 'query-string';
import Table from 'react-bootstrap/Table'
import HomeStyle from '../css/HomeStyle.module.css';
import '../css/ServiceCenter.css';

import { TOP, BOTTOM } from './Home';
import { permittedCrossDomainPolicies } from 'helmet';

class ServiceCenter extends Component {
  state = {
    cs_boardinfo: [],
    authority: [],
    date: '',
    time: '',
    setPage: '',
    cnt: 10,
  };

 
  componentDidMount() {
    this.onBoardboard_list();
    this.checkAuthority();
  }

  checkAuthority = () => {
    axios.get('/authority')
    .then(res=>this.setState({authority:res.data}))
    .catch((Error)=>{console.log(Error)})
  }

  // 게시판 쓰기, 읽기, 목록
  onBoardboard_list = () => {
    let query = this.getQueryString();

    // 배열 값 가져오고 count_length 값 정함
    axios.post(`/cscenter=board_list?page=${query}`,this.state)
    .then(res=> {this.setState({cs_boardinfo: res.data });})
    .then(res=> {

      
      let last = query*this.state.cnt;
      let first =  last - 9 - query;
      const count = this.state.cs_boardinfo;
      const count_length = Math.ceil(count.length/this.state.cnt);

      this.setState({pageCount: parseInt(count_length)*10});
      this.setState({pageRange: parseInt(count_length)});

      this.setState({cs_boardinfo: count.slice(first,last)});
      // for(let i=0; i<this.state.cs_boardinfo.length; i++){
      //   this.onLockImg(this.state.cs_boardinfo[i].look_post);
      // }
      document.getElementById("icon_img").style.backgroundImage = "url(/src/img/locker_icon.png)";
      document.getElementById("icon_img").style.backgroundSize = "cover";
      document.getElementById("icon_img").style.visibility = "visible";
    })
    .catch((Error)=>{console.log(Error)})
  }

  onCheckLook_post = (lookpost,inner_id,number) => {
    console.log(lookpost,inner_id,number);
    number = parseInt(number);
    let {id} = this.state.authority;
    console.log(id);
    console.log(this.state.authority);
    
    if(lookpost === 1){
      if(id !== inner_id){
        alert('회원님은 열람할 수 없는 게시글입니다.')
      }
      else{
        document.location.href="/cscenter=board_list_read?idx="+number;
      }
    }
    else{
      document.location.href="/cscenter=board_list_read?idx="+number;
    }
  }
  onLockImg = (lookpost) =>{

    if(lookpost === 1){
      // const style = {visibility : 'hidden',}
      document.getElementById("icon_img").style.visibility = "hidden";
    }

    // console.log(number);
    // document.getElementById("icon_img").style.visibility = "hidden";
    // console.log(this.state.cs_boardinfo);
    // if(lookpost === 1){
    // }
  }

  getQueryString = () => {
    const result = queryString.parse(this.props.location.search);
    const rst = result.page;
    
    parseInt(rst);
    return rst;
  };

  handlePageChange = (page) => {
 
    document.location.href = "?page=" + page;
  };

  render() {
    const { cs_boardinfo} = this.state;
    const { authority } = this.state;
    const pageNum = this.getQueryString();
    return (
    <div className={HomeStyle.body_wrap}>
    
      <TOP ReturnUrl={document.location.href}/>

      <div id="content">
        <div className="servicecenter_wrap">
          
          <div className="content_box">
            
            <div className="left_menu">
              <h2 className="depth_1">고객센터</h2>
              {/* <ul id="lnb" className="depth_2">
                <li>
                  <a>공지사항</a>href="/cscenter=not_list"
                </li>
                <li>
                  <a>자주묻는질문</a>href="/cscenter=faq_list"
                </li>
              </ul> */}
            </div>
              
          </div>

          <div className="boardlist">

            <div className="writeboardgo">
              {authority.status==="login"?<h1 className="write_icon"><Link to="/cscenter=board_list_write">글쓰기</Link></h1>:<h1 className="write_icon"><Link to={"/login?ReturnUrl=" + document.location.href}>로그인</Link></h1>}
            </div>
            <div className="b_list_table">

              <Table className="table table-hover">
                <caption>문의사항 리스트</caption>
                <colgroup>
                  <col width="7%"/>
                  <col width="62px"/>
                  <col/>
                  <col width="18%"/>
                  <col width="16%"/>
                  <col width="6%"/>
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">말머리</th>
                    <th scope="col">제목</th>
                    <th scope="col">글쓴이</th>
                    <th scope="col">작성일</th>
                    <th scope="col">조회</th>
                  </tr>
                </thead>
                <tbody>
                  {cs_boardinfo.map((item) => {
                    return(
                  <tr>
                    <td className="idx" key={item.idx}>{item.idx}</td>
                    <td className="subject">{item.subject}</td>
                    <td className="title_1" onClick={()=>this.onCheckLook_post(item.look_post,item.id,item.idx)} > <em className="icon_img" id="icon_img"/>
                      {item.title}
                    </td>
                    <td className="creater">{item.nickname}</td>
                    <td className="date_created">{item.date_created}</td>
                    <td className="hit">{item.hit}</td>
                  </tr>
                  )})}
                </tbody>
              </Table>
              
            </div>

            <Pagination activePage={parseInt(pageNum)} itemsCountPerPage={this.state.cnt} totalItemsCount={this.state.pageCount} pageRangeDisplayed={this.state.pageRange} prevPageText={"‹"} nextPageText={"›"} onChange={this.handlePageChange} />
            
          </div>

        </div> 

      </div>

      <BOTTOM/>
        
    </div>
    );
  }
}
  export default ServiceCenter;