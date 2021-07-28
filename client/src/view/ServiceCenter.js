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
    idx: '',
    returnUrl:['cscenter=board_list'],
    date: '',
    time: '',
    setPage: '',
    cnt: 5,
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

    const last = query*this.state.cnt;
    const first = last-last+1;
    
    // 배열 값 가져오고 count_length 값 정함
    axios.post(`/cscenter=board_list?page=${query}`,this.state)
    .then(res=> {this.setState({cs_boardinfo: res.data }); console.log(this.state.cs_boardinfo);})
    .then(res=> {const count_length = this.state.cs_boardinfo.length/this.state.cnt; console.log('count_length : ' + count_length); this.setState({count_length: count_length})})
    .then(res=> {
      const count = this.state.cs_boardinfo;
      console.log(count[0]);
      
      // const count_length = count/this.state.cnt;
      // console.log(count_length);
      // this.setState({count_length: count_length});})
    })
    .catch((Error)=>{console.log(Error)})

    // 배열 값 항목 지정해서 가져옴
    // axios.post(`/cscenter=board_list-count?page=${query}`,this.state)
    // .then(res=> {this.setState({cs_boardinfo: res.data }); console.log(this.state.cs_boardinfo);})
    // // .then(res=> {const count_length = this.state.cs_boardinfo/this.state.cnt; console.log(count_length);})
    // .then(res=> {
    //   const count = this.state.cs_boardinfo;
    //   // console.log('항목 수' + count);
      
    //   // const count_length = count/this.state.cnt;
    //   // console.log(count_length);
    //   // this.setState({count_length: count_length});})
    // })
    // .catch((Error)=>{console.log(Error)})
  }

  oncheckLook_post = () => {
    this.state.cs_boardinfo.map((item, number) => {
      if(item.look_post === 1 && this.state.authority.id !== "admin"){
      console.log(item.subject)
      alert("비공개글입니다. 운영자 및 작성자만 열람가능합니다.")
      
      window.location.reload()
      }
      // if(item.id[number] !== this.state.authority.id){
      //   console.log("저장된 subject" + item.subject)
      //   console.log("저장된 id" + item.id)
      //   alert("비공개글입니다. 운영자 및 작성자만 열람가능합니다.")
      //   window.location.reload()
      // }
    })
  }
  onSetLook_post = () => {
    // this.state.cs_boardinfo.map((item, number) => {
    //   // if(item.look_post === 1){
    //     var lock = document.getElementsByClassName("icon_img")
        
    //     lock.style.img = "../src/img/locker_icon.png";
    //     lock.style.backgroundsize = "cover";
        
    //   // }
    //   if(item.look_post !== 1){
    //     var lock = document.getElementsByClassName("icon_img")
        
    //     lock.style.backgroundimage = "/src/img/locker_icon.png";
    //     lock.style.backgroundsize = "cover";
    //   }
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
                  <a href="/cscenter=not_list">공지사항</a>
                </li>
                <li>
                  <a href="/cscenter=faq_list">자주묻는질문</a>
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
                    <td className="num" key={item.idx}>{item.idx}</td>
                    <td className="subject">{item.subject}</td>
                    <td className="title"><em className="icon_img"/>
                      <Link to={'/cscenter=board_list_read?idx=' + parseInt(number+1)} onClick={this.oncheckLook_post}>
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
            
            <Pagination activePage={parseInt(pageNum)} itemsCountPerPage={this.state.count} totalItemsCount={this.state.count_length} pageRangeDisplayed={5} prevPageText={"‹"} nextPageText={"›"} onChange={this.handlePageChange} />
            
          </div>

        </div> 

      </div>

      <BOTTOM/>
        
    </div>
    );
  }
}
  export default ServiceCenter;