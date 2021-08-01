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
    returnUrl:['cscenter=board_list'],
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

      this.setState({cs_boardinfo: count.slice(first,last)})
    })
    .catch((Error)=>{console.log(Error)})
  }
  // 어떻게 클릭한 부분의 배열을 가져올 수 있을까? 가져올 수 있다면 이것은 해결되는 문제인걸
  oncheckLook_post = () => {
    // this.state.cs_boardinfo.map((item, number) => {
      console.log(this.state.lookPoint);
      // console.log(this.state.cs_boardinfo[0].look_post); 배열 안에 클릭한 값이 속하는 배열 값을 줘야함.
      // if(item.look_post === 1){
      //   alert(this.state.authority.id);
      //   if(this.state.authority.id === 'admin'){
      //     if(this.state.authority.id !== item.id){
      //       console.log(item.subject);
            
      //       alert("비공개글입니다. 운영자 또는 작성자만 열람가능합니다.");
            
      //       window.location.reload();
      //     }
      //   }
      // }
      // if(item.look_post !== 1){
      //   alert("공개글")
      // }
    // })
  }

  getQueryString = () => {
    const result = queryString.parse(this.props.location.search);
    const rst = result.page;
    
    parseInt(rst)
    return rst;
  };

  handlePageChange = (page) => {
 
    document.location.href = "?page=" + page;
  };

  render() {
    const { cs_boardinfo} = this.state;
    const { authority } = this.state;
    const { returnUrl} = this.state;
    const pageNum = this.getQueryString();
    return (
    <div className={HomeStyle.body_wrap}>
    
      <TOP/>

      <div id="content">
        <div className="servicecenter_wrap">
          
          <div className="content_box">
            
            <div className="left_menu">
              <h2 className="depth_1">고객센터</h2>
              <ul id="lnb" className="depth_2">
                <li>
                  <a>공지사항</a>{/* href="/cscenter=not_list" */}
                </li>
                <li>
                  <a>자주묻는질문</a>{/* href="/cscenter=faq_list" */}
                </li>
              </ul>
            </div>
              
          </div>

          <div className="boardlist">

            <div className="writeboardgo">
              {authority.status==="login"?<h1 className="write_icon"><Link to="/cscenter=board_list_write">글쓰기</Link></h1>:<h1 className="write_icon"><Link to={"/user/login?returnUrl=" + this.state.returnUrl}>로그인</Link></h1>}
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
                  {cs_boardinfo.map((item,number) => {
                    return(
                  <tr>
                    {/* onChange={e => this.setState({ lookPoint: e.target.value })} */}
                    <td className="num" key={item.number}>{item.idx}</td>
                    <td className="subject">{item.subject}</td>
                    <td className="title" onClick={this.oncheckLook_post}><em className="icon_img" onChange={e => this.setState({ lookPoint: e.target.value })}> {item.look_post} </em> 
                      <Link to={'/cscenter=board_list_read?idx=' + parseInt(number+1)} >
                        {item.title}
                      </Link>
                    </td>
                    <td className="creater">{item.nickname}</td>
                    <td className="date_created">{item.date_created}</td>
                    <td className="hit">{item.hit}</td>
                  </tr>
                  )})}
                </tbody>
              </Table>
              
            </div>
            
            {/* 페이징 작업을 위한 코드 */}
            {/* <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={450} pageRangeDisplayed={5} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} /> */}
            
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